namespace my.clearance;

entity empDetails {
    key ID             : UUID;
        employeeName   : String;
        employeeNumber : String(11);
        nationality    : String(2);
        department     : String(2);
        title          : String;
        reason         : String;
        notes          : String;
        reqStatus      : ReqStatus;
        attachments : Composition of many Attahcments on attachments.empD = $self ;
}

type ReqStatus : String enum {
    Pending = 'P';
    Approved = '   ';
    Rejected = 'R';
}

// Attahcments
entity Attahcments {
    key ID : UUID ;
    empD      : Association to empDetails;

                       @Core.MediaType                  : mediaType
                       @Core.ContentDisposition.Filename: fileName
                       @Core.ContentDisposition.Type    : 'inline'
    mediaType : String @Core.IsMediaType;
    fileName  : String;
    content   : LargeBinary
}


// employee master Data


//Status Values
