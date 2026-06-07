sap.ui.define(
  [
    "attendanceshabas/attendanceshabas/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "../model/formatter"
  ],
  function (BaseController, Controller, JSONModel, Fragment, formatter) {
    "use strict";

    return BaseController.extend(
      "attendanceshabas.attendanceshabas.controller.Home",
      {
        onInit: function () {
          this._Page = this.getView().getContent()[0];
          
          
          this.oBundle = this.getOwnerComponent()
            .getModel("i18n")
            .getResourceBundle();

          var currentHour = new Date().getHours();
          if (currentHour < 12) {
            var greeting = this.oBundle.getText("GoodMorning");
          } else if (currentHour < 18) {
            greeting = this.oBundle.getText("GoodAfternoon");
          } else {
            greeting = this.oBundle.getText("GoodEvening");
          }; 

          var update = {
            "IvCaller": "",
            "IvPdsnr": "",
            "IvUserName": "",
            "IvPersonnelNumber": "",
            "IvBegda": {},
            "IvEndda": {},
            "IvActionType": "",
            "IvEventype": "",
            "IvBeguz": "",
            "IvEnduz": "",
            "IvSubtyp": "",
            "IvAbwgr": "",
            "IvComment": "",
            "IvPt60": "",
            "IvApp": "",
            "Approval": "",
            "EvUpdStatus": "",
            "EvCodeMessage": "",
            "EvTextMessage": "",
            "EvTypeMessage": "",
            "ApproveData": [],
            "MessageReturn": []
          };
          var menuActions = [{Title: this.oBundle.getText("EditAttendance"), 
                              Icon: "../css/images/Calendar.svg",
                              ActionType: "1",
                              ActionScreen: "itemAction",
                              Action: "EditAttendance",
                              visible: false},
                            {Title: this.oBundle.getText("EditAbcense"), 
                              Icon: "../css/images/CalendarClose.svg",
                              ActionType: "3",
                              ActionScreen: "itemAction",
                              Action: "EditAbcense",
                              visible: false},
                            {Title: this.oBundle.getText("EditShift"), 
                              Icon: "sap-icon://dark-mode",
                              ActionType: "12",
                              ActionScreen: "itemAction",
                              Action: "EditShift",
                              visible: false},
                            {Title: this.oBundle.getText("CancelShift"), 
                              Icon: "sap-icon://dark-mode",
                              ActionType: "12",
                              ActionScreen: "itemAction",
                              Action: "ECancelShift",
                              visible: false},  
                            {Title: this.oBundle.getText("EditFreeDay"), 
                              Icon: "sap-icon://text-align-justified",
                              ActionType: "13",
                              ActionScreen: "itemAction",
                              Action: "EditFreeDay",
                              visible: false},
                            {Title: this.oBundle.getText("CancelFreeDay"), 
                              Icon: "sap-icon://text-align-justified",
                              ActionType: "14",
                              ActionScreen: "itemAction",
                              Action: "CancelFreeDay",
                              visible: false},
                            {Title: this.oBundle.getText("EditNightShift"), 
                              Icon: "sap-icon://bell",
                              ActionType: "15",
                              ActionScreen: "itemAction",
                              Action: "EditNightShift",
                              visible: false},
                            {Title: this.oBundle.getText("CancelNightShift"), 
                              Icon: "sap-icon://bell",
                              ActionType: "16",
                              ActionScreen: "itemAction",
                              Action: "CancelNightShift",
                              visible: false},
                            {Title: this.oBundle.getText("EditAlert"), 
                              Icon: "sap-icon://text-align-justified",
                              ActionType: "18",
                              ActionScreen: "itemAction",
                              Action: "EditAlert",
                              visible: false},
                            {Title: this.oBundle.getText("CancelAlert"), 
                              Icon: "sap-icon://text-align-justified",
                              ActionType: "19",
                              ActionScreen: "itemAction",
                              Action: "CancelAlert",
                              visible: false},
                            {Title: this.oBundle.getText("View"), 
                              Icon: "sap-icon://detail-view",
                              ActionType: "0",
                              ActionScreen: "itemAction",
                              Action: "ViewDetails",
                              visible: true},    
                            {Title: this.oBundle.getText("EditRemark"), 
                              Icon: "sap-icon://text-align-justified",
                              ActionType: "7",
                              ActionScreen: "itemAction",
                              Action: "EditRemark",
                              visible: true},  
                            {Title: this.oBundle.getText("EditRemark"), 
                              Icon: "sap-icon://text-align-justified",
                              ActionType: "17",
                              ActionScreen: "headerAction",
                              Action: "EditRemark",
                              visible: true}];

          const oModel = new JSONModel({
            isCheckedIn: false,
            showEntryScreen: true,
            lastTime: "",
            location: "",
            Employee: {},
            greeting: greeting,
            navigation: [],
            ReasonsList: [],
            Entries: [],
            Month: {},
            Data: JSON.parse(JSON.stringify(update)),  
            menuAction: JSON.parse(JSON.stringify(menuActions)), 
            DailyReport: {"CurrentClock": "B",
                          "Remark": "", 
                          "RemarkDef": this.oBundle.getText("DailyRemark"),
                          "Reason": "", 
                          "ReasonDef": this.oBundle.getText("DailyReasonSelect"),
                          "Approve": true},
            MonthlyReport: {"Attendance": [],
                          "AttendanceTotals":{},
                          "Balance": [],
                          "AttFilter": [{"key": 1, "text": this.oBundle.getText("MyReports")},
                                        {"key": 2, "text": this.oBundle.getText("Errors"), "count": 0},
                                        {"key": 3, "text": this.oBundle.getText("MyAbcenses"), "count": 0}],
                          "Sort": false,
                          "ShowTotalPanel": false,                                        
                          "Approve": false},
            AnsenceReport: {"Reason": "",
                            "ReasonDef": this.oBundle.getText("AbsenceReasonSelect"),
                            "Absence": {"ReportHours" : false,
                                        "ReportFullDays" : false,
                                        "CompleteDay" : false,
                                        "PeriodReport" : false,
                                        "ManagerApprove" : false,
                                        "AdministratorApprove" : false,
                                        "AddFile" : false,
                                        "ReportComment" : false,
                                        "AdditionalAbsenceData" : false},
                                                                 
                            "Period": null,
                            "PeriodDef": this.oBundle.getText("AbsencePeriod"),
                            "Hours": "",
                            "HoursDef": this.oBundle.getText("AbsenceHours"),
                            "Attachment": {},
                            "AttachmentDef": this.oBundle.getText("AbsenceAttachment"),
                            "Remark": "",
                            "RemarkDef": this.oBundle.getText("DailyRemark"),
                            
                            "Approve": false},              
            WorkArrangement: {"Month": true,
                              "Week": false},                                  
            RemarkDialog: {"Title": "",
                           "Text": "",
                           "ActionType": ""}                              
          });

          this.getView().setModel(oModel, "clockModel");
          this.getView().getModel("clockModel").refresh(false);

          this.MobInitData();
          
          
        },

        onBeforeShow: function (oEvent) {
          var oButton = this.byId("animButton"); // וודא שיש ID לכפתור ב-XML

          oButton.addEventDelegate(
            {
              onmousedown: function () {
                // ברגע הלחיצה - מוסיפים את ה-class והוא מחליק ימינה
                oButton.addStyleClass("buttonMovedRight");
              },
              onmouseup: function () {
                // אופציונלי: אם רוצים שיחזור כשעוזבים את הלחיצה
                oButton.removeStyleClass("buttonMovedRight");
              },
            },
            this,
          );
        },
        onAnimatePress: function (oEvent) {
          this.loadFragments(this, "monthlyAttendance", this._Page);
          //var oButton = oEvent.getSource();

          // הוספת ה-Class שמפעיל את הטרנספורמציה
          //oButton.addStyleClass("buttonMovedRight");

          // אם רוצים שהכפתור יחזור אחרי שנייה, אפשר להשתמש ב-setTimeout
          /*
        setTimeout(function() {
            oButton.removeStyleClass("buttonMovedRight");
        }, 1000);
        */
        },
        changeMonthToHeb: function (month) {
 
        },
        onHBoxPress: function (oEvent) {
          sap.m.MessageToast.show("ה-HBox נלחץ!");
          var oHBox = this.getView().byId("hbox-circle");
          var text = this.getView().byId("circle-enter");
          // בדיקה אם הקלאס כבר קיים
          if (oHBox.hasStyleClass("hbox-circle")) {
            oHBox.removeStyleClass("hbox-circle"); // הסרה
            oHBox.addStyleClass("hbox-circle-green");
            text.setText(this.oBundle.getText("exit"));
            const oModel = this.getView().getModel("clockModel");

            const bCheckedIn = oModel.getProperty("/isCheckedIn");
            const now = new Date();
            const sTime = now.toLocaleTimeString("he-IL", {
              hour: "2-digit",
              minute: "2-digit"
            });
            // קבלת מיקום
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                function (position) {
                  const lat = position.coords.latitude;
                  const lon = position.coords.longitude;

                  const locationText = `Lat: ${lat}, Lon: ${lon}`;

                  oModel.setProperty("/lastTime", sTime);
                  oModel.setProperty("/location", locationText);

                }.bind(this),
                function (error) {
                  oModel.setProperty("/lastTime", sTime);
                  oModel.setProperty("/location", "לא הצלחנו להביא מיקום");
                }.bind(this)
              );
            } else {
              oModel.setProperty("/lastTime", sTime);
              oModel.setProperty("/location", "המכשיר לא תומך במיקום");
            }

            this.getView().byId("hbox-clockTime").setVisible(true);


            oModel.setProperty("/isCheckedIn", !bCheckedIn);
            oModel.setProperty("/lastTime", sTime);
            this.getView().byId("hbox-clockTime").setVisible(true);
          } else {
            oHBox.removeStyleClass("hbox-circle-green");
            this.getView().byId("hbox-clockTime").setVisible(false);
            oHBox.addStyleClass("hbox-circle"); // הוספה
            text.setText(this.oBundle.getText("enter"));
          }
        },
        openMyMenu: async function () {
          this.loadFragments(this, "MyMenu", this._Page);
          //this.MyMenu = await this.loadFragment({
          //  name: "attendanceshabas.attendanceshabas.fragments.MyMenu",
          //});
          //this.MyMenu.open();
        },
        closeMyMenu: function () {
          this.onBack();
          //this.loadFragments(this, "MobileMainScreen", this._Page);
          //this.MyMenu.close();
          //this.MyMenu.destroy();
          //this.MyMenu = null;
        },
        addCertificate: async function () {
          this.addCertificate = await this.loadFragment({
            name: "attendanceshabas.attendanceshabas.fragments.AddCertificate",
          });
          this.addCertificate.open();
        },

        closeAddCertificate: function () {
          this.addCertificate.close();
          this.addCertificate.destroy();
          this.addCertificate = null;
        },
        addReport: async function () {
          this.addReport = await this.loadFragment({
            name: "attendanceshabas.attendanceshabas.fragments.addReport",
          });
          this.addReport.open();
        },

        actionsPopup: function (oEvent) {
          var oButton = oEvent.getSource(),
            oView = this.getView();

          // create popover
          if (!this._pPopover) {
            this._pPopover = Fragment.load({
              id: oView.getId(),
              name: "attendanceshabas.attendanceshabas.fragments.ActionsPopup",
              controller: this,
            }).then(function (oPopover) {
              oView.addDependent(oPopover);
              // oPopover.bindElement("/ProductCollection/0");
              return oPopover;
            });
          }
          this._pPopover.then(function (oPopover) {
            oPopover.openBy(oButton);
          });
        },

        openCalendar: function (oEvent) {
          var oButton = oEvent.getSource(),
            oView = this.getView();

          // Create popover if it doesn't exist
          if (!this.oCalendarPopover) {
            this.oCalendarPopover = Fragment.load({
              id: oView.getId(), // Using the view's ID for unique fragment IDs
              name: "attendanceshabas.attendanceshabas.fragments.Calendar",
              controller: this,
            }).then(function (oPopover) {
              oView.addDependent(oPopover);
              return oPopover;
            });
          }

          // Open the calendar fragment when ready
          this.oCalendarPopover.then(function (oPopover) {
            oPopover.openBy(oButton);
          });
        },

        handleCalendarSelect: function (oEvent) {
          var selectedDates = oEvent.getSource().getSelectedDates()[0];
          var startDate = selectedDates.getStartDate().toLocaleDateString("he");
          var endDate = selectedDates.getEndDate();
          if (!endDate) {
            endDate = startDate;
          } else {
            endDate = selectedDates.getEndDate().toLocaleDateString("he");
          }
          this.getView()
            .byId("absenceDatesInput")
            .setValue(`${startDate} - ${endDate}`);
        },

        onMonthsPress: function (oEvent) {
          var oButton = oEvent.getSource(),
            oView = this.getView();

          // create popover
          if (!this.oMonthsPress) {
            this.oMonthsPress = Fragment.load({
              id: oView.getId(),
              name: "attendanceshabas.attendanceshabas.fragments.Months",
              controller: this,
            }).then(function (oPopover) {
              oView.addDependent(oPopover);
              // oPopover.bindElement("/ProductCollection/0");
              return oPopover;
            });
          }
          this.oMonthsPress.then(function (oPopover) {
            oPopover.openBy(oButton);
          });
        },

        openAttendanceUpdate: async function () {
          this.openAttendanceUpdate = await this.loadFragment({
            name: "attendanceshabas.attendanceshabas.fragments.AttendanceUpdate",
          });
          this.openAttendanceUpdate.open();
        },
        openDetailsEmp: async function () {
          if (this.getOwnerComponent().getModel("device").getData().system.phone){
            var name = "attendanceshabas.attendanceshabas.fragments.Mobile.MyDetails";
          }else{
            name = "attendanceshabas.attendanceshabas.fragments.MyDetails";
          }
          this.MyMenu = await this.loadFragment({
            name: name
          });
          this.MyMenu.open();
        },
        closeDetailsEmp: async function () {
          this.MyMenu.close();
          this.MyMenu.destroy();
          this.MyMenu = null;
        },

        onMenuItemPress: function (oEvent) {
          oEvent.getSource().removeSelections();

          var oModel = this.getView().getModel("clockModel");
          var sRoute = oEvent.getParameter("listItem").data("route");
          if (sRoute){
            this.loadFragments(this, sRoute, this._Page);
            return;
          }
          sRoute = oEvent.getParameter("listItem").data("itemAction");
          if (sRoute){
            var popover = oEvent.getParameter("listItem").getParent().getParent();
            if (popover){
              var item = popover._oOpenBy.getParent().getBindingContext("clockModel").getObject();
              popover.close();
              oModel.setProperty("/DailyItem", item);
              var editPath = popover._oOpenBy.getParent().getBindingContext("clockModel").sPath;
              switch(sRoute){
                case "EditMonthlyEntrie":
                  item.Editable = true;
                  oModel.setProperty(editPath, item);
                  oModel.refresh(false);
                  break;
                case "DeleteMonthlyEntrie":
                  break;
                case "ViewMonthlyEntrie":
                  this.OpenDialogScreen.call(this, "DailySummaryDetails");
                  break;
                case "ViewDetails" :
                  this.MobOnMonthlyReportDay(oEvent);
                  break;
                case "EditRemark":
                  oModel.setProperty("/RemarkDialog/Title", oEvent.getParameter("listItem").getTitle());
                  oModel.setProperty("/RemarkDialog/Text", item.Comment);
                  oModel.setProperty("/RemarkDialog/ActionType", "7");
                  this.OpenDialogScreen.call(this, "RemarkUpdate");
                  break;
               }
              }
              return;
            }
            sRoute = oEvent.getParameter("listItem").data("headerAction");
            if (sRoute){
              switch(sRoute){
                case "monthlyRemark":
                  
                  oModel.setProperty("/RemarkDialog/Title", oEvent.getParameter("listItem").getTitle());
                  oModel.setProperty("/RemarkDialog/Text", oModel.getProperty("/Month/MonthlyEmployeeComment"));
                  oModel.setProperty("/RemarkDialog/ActionType", "17");
                  this.OpenDialogScreen.call(this, "RemarkUpdate");
                  break;
                default:
                  break;  
              }
              return;
            }
                   
          //const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          //oRouter.navTo(sRoute);

          //this.closeMyMenu();
        },

//         _
//        | |
//        |_|
//        /_\    \ | /
//      .-"""------.----.
//      |          U    |
//      |               |
//      | ====o======== |
//      | ============= |
//      |               |
//      |_______________|
//      | ________GF337 |
//      ||   Welcome   ||
//      ||             ||
//      ||_____________||
//      |__.---"""---.__|
//      |---------------|
//      |[Yes][(|)][ No]|
//      | ___  ___  ___ |
//      |[<-'][CLR][.->]|
//      | ___  ___  ___ |
//      |[1__][2__][3__]|
//      | ___  ___  ___ |
//      |[4__][5__][6__]|
//      | ___  ___  ___ |
//      |[7__][8__][9__]|
//      | ___  ___  ___ |
//      |[*__][0__][#__]|
//      `--------------'
//      {__|""|_______'-
//      `---------------'        
        MobInitData: function(){
          var oModel = this.getView().getModel("clockModel");
          this.loadFragments(this, "MobileMainScreen", this._Page);

          var model = this.getOwnerComponent().getModel();
          model.read("/GetReasonsSet", {
            success: function(oData){
              oModel.setProperty("/ReasonsList", oData.results);
            },
            error: function(oEvent){debugger;}
          });
          var currPeriod = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyyMM", calendarType: 'Gregorian'}).format(new Date());
          this.MobReadAttendanceData(currPeriod);
        },

        MobReadAttendanceData: function(iPeriod){
          var oModel = this.getView().getModel("clockModel");
          var model = this.getOwnerComponent().getModel();

          model.read("/GetInfoEmpSet", {
            urlParameters: {
              "$expand": "ApproveAbsenceNav,ApproveIlnesNav,MonthNav,TitleDataNav,AttAbsNav,BalanceNav"
            },
            filters: [new sap.ui.model.Filter("IvPeriod", "EQ", iPeriod)],
            success: function(oData){
              var employee = oData.results[0].TitleDataNav.results[0];
              employee.FirstName = employee.Name.substring(0, employee.Name.indexOf(' ')); 
              employee.LastName = employee.Name.substring(employee.Name.indexOf(' ') + 1); 
              oModel.setProperty("/Employee", employee);

              var att = [];
              var balance = [];
              var totalErrors = 0;
              var totalAbsence = 0;
              for (var i = 0; i < oData.results[0].AttAbsNav.results.length; i++){
                var dailyItem = structuredClone(oData.results[0].AttAbsNav.results[i]);
                dailyItem.menuAction = JSON.parse(JSON.stringify(oModel.getProperty("/menuAction")));
                
                if (oData.results[0].AttAbsNav.results[i].Datum === null){
                  oModel.setProperty("/MonthlyReport/AttendanceTotals", dailyItem);
                  
                }else{
                  dailyItem.Error = false;
                  dailyItem.Absence = false;
                  dailyItem.Editable = false;

                  var menu = dailyItem.menuAction;

                  if (dailyItem.Trriger2 === "2.00" ||
                      dailyItem.Trriger2 === "3.00" ||
                      dailyItem.Trriger2 === "4.00" ||
                      dailyItem.Trriger2 === "5.00" ||
                      dailyItem.Trriger2 === "6.00") {
                    menu.find((element) => element.Action === "EditAttendance" && element.ActionScreen === "itemAction").visible = true;
                  }
                  if (dailyItem.Trriger2 === "2.00" ||
                      dailyItem.Trriger2 === "3.00" ||
                      dailyItem.Trriger2 === "5.00" ||
                      dailyItem.Trriger2 === "6.00") {
                    menu.find((element) => element.Action === "EditAbcense" && element.ActionScreen === "itemAction").visible = true;
                  }
                  if (dailyItem.Trriger2 === "2.00") {
                    if (dailyItem.PlannedWorkinHours === "0.00"){
                    menu.find((element) => element.Action === "CancelFreeDay" && element.ActionScreen === "itemAction").visible = true;
                    }else{
                    menu.find((element) => element.Action === "EditFreeDay" && element.ActionScreen === "itemAction").visible = true;  
                    }
                  }
                  if (dailyItem.Trriger2 === "3.00") {
                    if (dailyItem.PlannedWorkinHours === "0.00"){
                    menu.find((element) => element.Action === "CancelShift" && element.ActionScreen === "itemAction").visible = true;
                    }else{
                    menu.find((element) => element.Action === "EditShift" && element.ActionScreen === "itemAction").visible = true;  
                    }
                  }
                  if (dailyItem.Trriger2 === "5.00") {
                    if (dailyItem.Trriger3 === "0.00"){
                    menu.find((element) => element.Action === "EditNightShift" && element.ActionScreen === "itemAction").visible = true;
                    }else{
                    menu.find((element) => element.Action === "CancelNightShift" && element.ActionScreen === "itemAction").visible = true;  
                    }
                  }
                  if (dailyItem.Trriger2 === "6.00") {
                    if (dailyItem.Trriger3 === "0.00"){
                    menu.find((element) => element.Action === "EditAlert" && element.ActionScreen === "itemAction").visible = true;
                    }else{
                    menu.find((element) => element.Action === "CancelAlert" && element.ActionScreen === "itemAction").visible = true;  
                    }
                  }
                 
                  
                  if (dailyItem.Trriger1 !== "0.00"){
                    dailyItem.Error = true;
                    totalErrors++;
                  }
                  if (att.length > 0 && att[att.length - 1].Datum.getDate() === dailyItem.Datum.getDate()){
                    att[att.length - 1].Entries.push(dailyItem);
                  }else{
                    var flatItem = structuredClone(dailyItem);
                    flatItem.Entries = [];
                    flatItem.Entries.push(dailyItem);
                    att.push(flatItem);
                  }
                }
              }

              for (i = 0; i < oData.results[0].BalanceNav.results.length; i++){
                var balanceItem = oData.results[0].BalanceNav.results[i];
                if (balanceItem.Highlight){
                  var headerBalance = structuredClone(balanceItem);
                }else{
                  balance.push({"Reason": balanceItem.Field1, 
                            "Text1": headerBalance.Field2, "Value1": balanceItem.Field2,
                            "Text2": headerBalance.Field3, "Value2": balanceItem.Field3,
                            "Text3": headerBalance.Field4, "Value3": balanceItem.Field4,
                            "Text4": headerBalance.Field5, "Value4": balanceItem.Field5,
                            "Text5": headerBalance.Field6, "Value5": balanceItem.Field6});
                }               
              }
              oModel.setProperty("/MonthlyReport/Attendance", att);
              oModel.setProperty("/MonthlyReport/AttFilter/1/count", totalErrors);
              oModel.setProperty("/MonthlyReport/AttFilter/2/count", totalAbsence);
              oModel.setProperty("/MonthlyReport/Balance", balance);
              oModel.setProperty("/Month", oData.results[0].MonthNav.results[0]);
              oModel.refresh(false);
            },
            error: function(oEvent){debugger;}
          });
        },

        MobOnMonthNavigate: function(oEvent){
          var picker = oEvent.getSource();
          
          picker._oPopup.addStyleClass("MobileDetailsDialog");
          picker._oPopup._oCloseButton.addStyleClass("MobileButtonMenu");
          picker._oPopup._oControl._header.addStyleClass("MobileCalendarDialogBody")
          picker._oCalendar.addStyleClass("MobileCalendarMonth")
        },
        MobOnMonthChange: function(oEvent){
          var period = oEvent.getParameter("value");
          if (period !== ""){
            this.MobReadAttendanceData(period);
          }
        },
        MobClockPress: function(oEvent){
          oEvent.getSource().removeSelections();

  
          var oModel = this.getView().getModel("clockModel");
          if (oModel.getProperty("/DailyReport/CurrentClock")){
            var entry = true;
            var event = "B";
          }else{
            entry = false;
            event = "E";
          }
          const now = new Date();
          const sTime = now.toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit"
          });
          oModel.setProperty("/lastTime", sTime);      
          oModel.setProperty("/isCheckedIn", true);

          this.loadFragments(this, "DailyReport", this._Page);

          this.MobSwitchClockScreen();
        },
        MobSwitchClockScreen(){
          var oModel = this.getView().getModel("clockModel");
          var circle = this.getView().byId("clockCircle");
          if (oModel.getProperty("/DailyReport/CurrentClock") === "B"){
            circle.removeStyleClass("MobileClockCircle");
            circle.addStyleClass("MobileClockCircleExit");
            oModel.setProperty("/DailyReport/CurrentClock", "E");
          }else{
            circle.removeStyleClass("MobileClockCircleExit");
            circle.addStyleClass("MobileClockCircle");
            oModel.setProperty("/DailyReport/CurrentClock", "B");
          }
        },
        MobClockSwipe: function(oEvent){
          this.MobSwitchClockScreen();
        },
        MobReasonSelect: function(oEvent){
          //oEvent.getSource().removeSelections();
          
          var item = oEvent.getParameter("listItem").getBindingContext("clockModel").getObject();
          var oModel = this.getView().getModel("clockModel");
          oModel.setProperty("/DailyReport/Reason", item.Code);
          oEvent.getSource().getParent().getParent().setExpanded(false);
          oEvent.getSource().getParent().getParent().setHeaderText(item.TextCode);
          //if (oModel.getProperty("/DailyReport/Reason") !== "" && oModel.getProperty("/DailyReport/Remark") !== ""){
          //  oModel.setProperty("/DailyReport/Approve", true);
          //}
        },
        MobDailyRemarkChange: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          if (oModel.getProperty("/DailyReport/Reason") !== "" && oModel.getProperty("/DailyReport/Remark") !== ""){
            oModel.setProperty("/DailyReport/Approve", true);
          }
        },
        
        MobDailyApprove: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          var time = "PT" + String(new Date().getHours()).padStart(2, '0') + "H"
                     String(new Date().getMinutes()).padStart(2, '0') + "M"
                     String(new Date().getSeconds()).padStart(2, '0') + "S";
        

          var update = JSON.parse(JSON.stringify(oModel.getProperty("/Data")));
            update.IvCaller = "1";
            update.IvPdsnr = "";
            update.IvUserName = "";
            update.IvPersonnelNumber = "";
            update.IvBegda = new Date();
            update.IvEndda = new Date();
            update.IvActionType = "1";
            update.IvEventype = oModel.getProperty("/DailyReport/CurrentClock");
            update.IvBeguz = time;
            update.IvEnduz = time;
            update.IvSubtyp = "";
            update.IvAbwgr = oModel.getProperty("/DailyReport/Reson");
            update.IvComment = oModel.getProperty("/DailyReport/Remark");
            update.IvPt60 = "";
            update.IvApp = "P";
            

            this.saveDetais(update);
          //oModel.setProperty("/DailyReport/Approve", false);
          oModel.setProperty("/DailyReport/Reason", "");
          oModel.setProperty("/DailyReport/Remark", "");
          oModel.setProperty("/DailyReport/RemarkDef", this.oBundle.getText("DailyRemark"));
          oModel.setProperty("/DailyReport/ReasonDef", this.oBundle.getText("DailyReasonSelect"));
          oModel.refresh(false);

          this.onBack();
        },
        MobMonthlyAttendListFilter: function(oEvent){
          var aFilters = [];
          switch (oEvent.getParameter("selectedItem").getKey()){
            case "1":
              break;
            case "2":
              aFilters.push(new sap.ui.model.Filter("Error", "EQ", true));
              break;
            case "3":
              aFilters.push(new sap.ui.model.Filter("Absence", "EQ", true));
              break;    
          }
          oEvent.getSource().getParent().getParent().getBinding("items").filter(aFilters);
        },
        MobMonthlyAttendListSort: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          var sort = !oModel.getProperty("/MonthlyReport/Sort");
          oEvent.getSource().getParent().getParent().getBinding("items").sort(new sap.ui.model.Sorter("Datum", sort));
          oModel.setProperty("/MonthlyReport/Sort", sort);
        },
        MobOnMonthlyReportDay: function(oEvent){
          oEvent.getSource().removeSelections();
          if (oEvent.getParameter("listItem")){
            var entries = oEvent.getParameter("listItem").getBindingContext("clockModel").getObject().Entries;
          }
          
          if (! entries && oEvent.getSource().getParent()._oOpenBy
            && oEvent.getSource().getParent()._oOpenBy.getParent().getParent().getParent().getMetadata().getName() === 'sap.m.CustomListItem'){
            entries = oEvent.getSource().getParent()._oOpenBy.getParent().getParent().getParent().getBindingContext("clockModel").getObject().Entries;
          }
          if (entries.length){
            this.getView().getModel("clockModel").setProperty("/Entries", entries);
            this.getView().getModel("clockModel").refresh(false);
            this.MobOpenEntriesDetails();
          }
        },
        MobMonthlyReasonSelect: function(oEvent){
          var item = oEvent.getParameter("listItem").getBindingContext("clockModel").getObject();
          var oModel = this.getView().getModel("clockModel");
          oModel.setProperty("/AnsenceReport/Reason", item.Code);
          oModel.setProperty("/AnsenceReport/Absence", item);
          oEvent.getSource().getParent().getParent().setExpanded(false);
          oEvent.getSource().getParent().getParent().setHeaderText(item.TextCode);
          if (oModel.getProperty("/AnsenceReport/Reason") !== "" && oModel.getProperty("/AnsenceReport/Remark") !== ""){
            oModel.setProperty("/AnsenceReport/Approve", true);
          }
        },
        MobOpenEntriesDetails: async function () {
          this.OpenDialogScreen.call(this, "EntriesDetails");
        },
        
        MobOnEntriesDetailsMenu: function(oEvent){
          var item = oEvent.getSource().getParent().getParent().getParent().getParent().getBindingContext("clockModel").getObject();
          item.EditEntry = structuredClone(item);
          this.OpenActionMenu("EntriesDetailsMenu", oEvent.getSource());
        },
        MobOnEntriesDetailsMenuSave: function(oEvent){
          var item = oEvent.getSource().getParent().getParent().getParent().getParent().getBindingContext("clockModel").getObject();
          var oModel = this.getView().getModel("clockModel");
          var remark = oModel.getProperty("/RemarkDialog");
          
          var update = JSON.parse(JSON.stringify(oModel.getProperty("/Data")));
            update.IvCaller = "1";
            update.IvPdsnr = "";
            update.IvUserName = "";
            update.IvPersonnelNumber = "";
            update.IvBegda = item.EditEntry.Datum;
            update.IvEndda = item.EditEntry.Datum;
            update.IvActionType = remark.ActionType;
            update.IvEventype = "";
            update.IvBeguz = "";
            update.IvEnduz = "";
            update.IvSubtyp = "";
            update.IvAbwgr = "";
            update.IvComment = remark.Text;
            update.IvPt60 = "";
            update.IvApp = "P";
            update.Approval = "X";

            this.saveDetais(update);
            this.CloseDialogScreen(oEvent);
          debugger;
        },
        MobOnEntriesDetailsMenuUndo: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          oModel.setProperty("/DailyItem/Editable", false);
          oModel.refresh(false);
        },
        MobOnMonthlyItemMenu: function(oEvent){
          var menu = oEvent.getSource().getParent().getBindingContext("clockModel").getObject().menuAction;
          this.getView().getModel("clockModel").setProperty("/menuAction", menu);
          this.getView().getModel("clockModel").refresh(false);
                  
          this.OpenActionMenu("MonthlyItemMenu", oEvent.getSource());
        },
        MobMonthlyAttendActions: function(oEvent){
          this.OpenActionMenu("MonthlyHeaderMenu", oEvent.getSource());
        },
        MobOnWorkArrangementSwitch: function(oEvent){
          var key = oEvent.getParameter("item").getKey();
        },
        MobToMontlyReportTotalanel: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          oModel.setProperty("/MonthlyReport/ShowTotalPanel", !oModel.getProperty("/MonthlyReport/ShowTotalPanel"));
          oModel.refresh(false);
        },
        MobAbsenceCalendarSelect: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          var oSelectedDates = oEvent.getSource().getSelectedDates()[0];
          var oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "dd.MM.yyyy", calendarType: 'Gregorian'});
          if (oSelectedDates) {
            var oDate = oSelectedDates.getStartDate();
              if (oDate) {
                oModel.setProperty("/Data/IvBegda", oDate);
                var text = oFormatYyyymmdd.format(oDate);
              } 
              oDate = oSelectedDates.getEndDate();
              if (oDate) {
                oModel.setProperty("/Data/IvEndda", oDate);
                text = text + ' - ' + oFormatYyyymmdd.format(oDate);
              }
              oEvent.getSource().getParent().setHeaderText(text);
          }
        },
        MobUploadAttachment: function(oEvent)  {
          var oModel = this.getView().getModel("clockModel");
          var domRef = oEvent.getSource().getFocusDomRef();
          var file = domRef.files[0];
          var reader = new FileReader();
          reader.onload = function(oEvent) {
            oModel.setProperty("/MonthlyReport/Attachment", {name: file.name, data: oEvent.target.result})
          };
          reader.readAsDataURL(file);
          oEvent.getSource().getParent().setHeaderText(file.name);
        },
        MobSaveRemark: function(oEvent){
          var oModel = this.getView().getModel("clockModel");
          var remark = oModel.getProperty("/RemarkDialog");
          
          var update = JSON.parse(JSON.stringify(oModel.getProperty("/Data")));
            update.IvCaller = "1";
            update.IvPdsnr = "";
            update.IvUserName = "";
            update.IvPersonnelNumber = "";
            update.IvBegda = remark.ActionType === "7"? oModel.getProperty("/DailyItem/Datum"):null;
            update.IvEndda = remark.ActionType === "7"? oModel.getProperty("/DailyItem/Datum"):null;
            update.IvActionType = remark.ActionType;
            update.IvEventype = "";
            update.IvBeguz = "";
            update.IvEnduz = "";
            update.IvSubtyp = "";
            update.IvAbwgr = "";
            update.IvComment = remark.Text;
            update.IvPt60 = "";
            update.IvApp = "P";
            update.Approval = "X";

            this.saveDetais(update);
            this.CloseDialogScreen(oEvent);
            
            
        }
      },
    );
  },
);