sap.ui.define([], function () {
    "use strict";
    return {
        stringToHours: function (value) {
            if (!value || value.length < 4){
                return value;
            }
            return value.substring(0,2) + ":" + value.substring(2,4);
        },
        isVisible: function(value, value2, value3){
            if (value !== undefined){
                if (value === "" || value === null || ( typeof value["ms"] === "number" && value["ms"] === 0)){
                }else{
                    return true;
                }
            }
            if (value2 !== undefined){
                if (value2 === "" || value2 === null || ( typeof value2["ms"] === "number" && value2["ms"] === 0)){
                }else{
                    return true;
                }
            }
            if (value3 !== undefined){
                if (value3 === "" || value3 === null || ( typeof value3["ms"] === "number" && value3["ms"] === 0)){
                }else{
                    return true;
                }
            }
            return false;
        }
    };
});