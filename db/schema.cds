namespace my.clearance;

entity empDetails{
    key ID : UUID ;
    employeeName : String;
    employeeNumber : String(11);
    nationality : String(2);
    department : String(2) ;
    title : String;
    reason : String(10);
    notes : String ; 
}

