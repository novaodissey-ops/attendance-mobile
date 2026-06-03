sap.ui.define([
	"sap/ui/thirdparty/jquery",
	"sap/ui/core/util/MockServer",
	"sap/base/Log"
], (jQuery,  MockServer, Log) => {
	"use strict";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init() {
			// create
        
			const oMockServer = new MockServer({ rootUri: "/" });

			oMockServer.simulate("../localService/metadata.xml", {
				sMockdataBaseUrl: "../localService/mockdata",
				bGenerateMissingMockData: true
			});
			oMockServer.attachAfter("POST", function (oEvent) {
				var oXhr = oEvent.getParameter("oXhr");
				var oEntity = oEvent.getParameter("oEntity");

				// You can inspect the request
				var sUrl = oXhr.url;
				var sBody = oXhr.requestBody;

				// Modify the entity before returning it
				oEntity.ApproveData = [
					{
						DateFrom: "\/Date(1772323200000)\/",
						DateTo: "\/Date(1772323200000)\/",
						TimeOfEnter: "100000",
						TimeOfGoingOut: "110000",
						AbbsenceType: "100"
					}
				];
				oEntity.MessageReturn = [{"Type": "S",
					"Id": "CLASS",
					"Number": "001",
					"Message": "Message from Mock server"

				}];

				// Send the custom response
				oXhr.respond(
					201,
					{ "Content-Type": "application/json" },
					JSON.stringify({ d: oEntity })
				);
			});

			// handling mocking a function import call step
			const aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "GET",
				path: new RegExp("FindUpcomingMeetups(.*)"),
				response: (oXhr) => {
					jQuery.ajax({
						url: '/GetReasonsSet',
						dataType : 'json',
						async: false,
						success : (oData) => {
							oXhr.respondJSON(200, {}, JSON.stringify(oData));
						}
					});
					return true;
				}
			});
			aRequests.push({
				method: "GET",
				path: new RegExp("FindUpcomingMeetups(.*)"),
				response: (oXhr) => {
					jQuery.ajax({
						url: '/GetInfoEmpSet',
						dataType : 'json',
						async: false,
						success : (oData) => {
							oXhr.respondJSON(200, {}, JSON.stringify(oData));
						}
					});
					return true;
				}
			});
			oMockServer.setRequests(aRequests);

			// handling custom URL parameter step
			const fnCustom = (oEvent) => {
				const oXhr = oEvent.getParameter("oXhr");
					//if (oXhr?.url.includes("first")) {
					//oEvent.getParameter("oFilteredData").results.splice(3, 100);
				//}
			};
			oMockServer.attachAfter("GET", fnCustom, "GetReasonsSet");
			oMockServer.attachAfter("GET", fnCustom, "GetInfoEmpSet");

			// start
			oMockServer.start();

			Log.info("Running the app with mock data");
		}
	};
});