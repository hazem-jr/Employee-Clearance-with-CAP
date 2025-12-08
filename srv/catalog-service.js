//access to all cap nodejs apis
const cds = require('@sap/cds');

class EmpClearance extends cds.ApplicationService {

  async init() {

    const { clearance } = this.entities;
    //register the before event
    this.after('CREATE', clearance, this.triggerClearanceProcessd);

    return super.init();
  }
  myValidations(req) {
    const { employeeName, employeeNumber } = req.data;

  };
  async triggerClearanceProcessd(req) {
    const { ID, employeeName, employeeNumber } = req.data;

  };

}

module.exports = EmpClearance;