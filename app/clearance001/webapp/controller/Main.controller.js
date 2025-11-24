//const { func } = require("@sap/cds/lib/ql/cds-ql");

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], (Controller, MessageBox, Fragment, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("clearance001.controller.Main", {
        onInit() {
        },
        submit: function () {
            debugger;
            //var id = this.getView().byId("id_ID").getValue();
            var employeeName = this.getView().byId("id_employeeName").getValue();
            var employeeNumber = this.getView().byId("id_employeeNumber").getValue();
            var nationality = this.getView().byId("id_nationality").getValue();
            var department = this.getView().byId("id_department").getValue();
            var title = this.getView().byId("id_title").getValue();
            //var reason = this.getView().byId("id_reason").getValue();
            var oRadioButtonGroup = this.getView().byId("RBG_reason_ID");
            // var RD_Resignation = this.getView.byId("RB_resignation_id").getValue();
            // var RD_Vacation = this.getView.byId("RB_vacation_ID").getValue();
            var notes = this.getView().byId("id_notes").getValue();

            // the clearance Reason 
            var oSelectedButton = oRadioButtonGroup.getSelectedButton();
            if (oSelectedButton) {
                var reason = oSelectedButton.getText();
            }

            // Model - communcation btw BE and FE
            var oModel = this.getView().getModel();

            // initiate the creation of a new entity 
            //by invoke the create method to send data to the backend 
            var oContext = oModel.bindList("/clearance").create({
                "employeeName": employeeName,
                "employeeNumber": employeeNumber,
                "nationality": nationality,
                "department": department,
                "title": title,
                "reason": reason,
                "notes": notes
            });
            // show the result 
            oContext.created().then(() => {
                //message
                MessageBox.success("Form Submited");
                this.getView().byId("id_employeeName").setValue(null);
                this.getView().byId("id_employeeNumber").setValue(null);
                this.getView().byId("id_nationality").setValue(null);
                this.getView().byId("id_department").setValue(null);
                this.getView().byId("id_title").setValue(null);
                this.getView().byId("id_reason").setValue(null);
                this.getView().byId("id_notes").setValue(null);
            }).catch((err) => {
                //message
                MessageBox.error("Error when submitting the Form");
                console.error("Error submitting the Form : " + err);
            })

        },

        onCollapseExpandPress() {
            const oSideNavigation = this.byId("sideNavigation"),
                bExpanded = oSideNavigation.getExpanded();

            oSideNavigation.setExpanded(!bExpanded);
        },
        onAddNewApplication() {
            this.hideAllPanels();
            var oPanel = this.byId("_IDGenPanel1");
            oPanel.setVisible(true);
        },
        onViewApplications() {
            this.hideAllPanels();
            this.byId("_IDGenPanel").setVisible(true);
        },
        onEditRecordPressed: function () {
            this.hideAllPanels();
            this.byId("_IDGenPanel2").setVisible(true);
        },
        onGoToHome() {
            this.hideAllPanels();
        },
        hideAllPanels() {
            this.byId("_IDGenPanel").setVisible(false);
            this.byId("_IDGenPanel1").setVisible(false);
            this.byId("_IDGenPanel2").setVisible(false);
        },
        onActionPressed: function (oEvent) {
            //debugger;

            var oButton = oEvent.getSource();
            this.oSelectedContext = oButton.getBindingContext(); // Fixed typo

            // If the fragment is not created yet
            if (!this._oActionSheet) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "clearance001.view.ActionSheet",
                    controller: this
                }).then(function (oActionSheet) {

                    this._oActionSheet = oActionSheet;          // Save instance
                    this.getView().addDependent(this._oActionSheet);

                    this._oActionSheet.openBy(oButton);         // Open from button
                }.bind(this));
            } else {
                this._oActionSheet.openBy(oButton);             // Already created → open directly
            }
        },
        onDeletePressed: function () {
            var oContext = this.oSelectedContext;
            var ID = oContext.getProperty("ID");
            var Name = oContext.getProperty("employeeName");

            MessageBox.confirm(
                "Are you sure you want to delete the record for employee: " + Name + "?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: function (oAction) {

                        if (oAction === MessageBox.Action.YES) {

                            oContext.delete("$direct")
                                .then(function () {
                                    MessageBox.success("Record " + ID + " deleted successfully.");
                                })
                                .catch(function (oError) {
                                    MessageBox.error("Error deleting the record with ID " + ID + "!");
                                });

                        }
                    }
                }
            );
        },

        onEditPressed: function () {
            debugger;
            var oData = this.oSelectedContext.getObject();
            this.onEditRecordPressed();
            var clearanceRecord = this.getOwnerComponent().getModel();
            // filter on the OData
            let Filters = [new Filter("ID", FilterOperator.EQ, oData.ID)];
            let oBinding = clearanceRecord.bindList("/clearance");
            oBinding.filter(Filters);
            oBinding.requestContexts().then((aContexts) => {
                if (aContexts.length > 0) {
                    aContexts.forEach((oContext) => {
                        let record = oContext.getObject();
                        this.getView().byId("id_ID11").setValue(record.ID);
                        this.getView().byId("id_employeeName111").setValue(record.employeeName);
                        this.getView().byId("id_employeeNumber1").setValue(record.employeeNumber);
                        this.getView().byId("id_nationality1").setValue(record.nationality);
                        this.getView().byId("id_department1").setValue(record.department);
                        this.getView().byId("id_title1").setValue(record.title);
                        this.getView().byId("id_reason").setValue(record.reason);
                        this.getView().byId("id_notes1").setValue(record.notes);
                    });
                } else {
                    MessageBox.error("The Document ID is not Found!");
                }
            }).catch((oError) => {
                MessageBox.error("Error Retrieving Document Details" + oError);
            });
        },
        onUpdateRecord: function () {
            debugger;
            var recordID = this.getView().byId("id_ID11").getValue();
            var employeeName = this.getView().byId("id_employeeName111").getValue();
            var employeeNumber = this.getView().byId("id_employeeNumber1").getValue();
            var nationality = this.getView().byId("id_nationality1").getValue();
            var department = this.getView().byId("id_department1").getValue();
            var title = this.getView().byId("id_title1").getValue();
            var notes = this.getView().byId("id_notes1").getValue();

            var updateOModel = this.getView().getModel();
            var path = "/clearance('" + recordID + "')";
            var oContext = updateOModel.bindContext(path).getBoundContext();

            var oView = this.getView();
            function resetBusy() {
                oView.setBusy(false);
            }

            // fill the request properties
            oContext.setProperty("employeeName", employeeName);
            oContext.setProperty("employeeNumber", employeeNumber);
            oContext.setProperty("nationality", nationality);
            oContext.setProperty("department", department);
            oContext.setProperty("title", title);
            oContext.setProperty("notes", notes);

            updateOModel.submitBatch("auto").then(function () {
                resetBusy();
                MessageBox.success("Item details Updated sucssefully");
            }).catch(function (err) {
                MessageBox.error("Error occured while update" + err);
            });
        },

        formatReqStatusText: function (sStatus) {
           debugger ;
            switch (sStatus) {
                case "A":
                    return "Approved";
                case "R":
                    return "Rejected";
                default:
                    return "Pending" ;      
            }
        },
        formatReqStatusState: function (sStatus) {
            debugger;
            switch (sStatus) {
                case "A":
                    return sap.ui.core.ValueState.Success;
                case "R":
                    return sap.ui.core.ValueState.Error;
                case "P":
                    return sap.ui.core.ValueState.warning;
            }

        }
    });
});