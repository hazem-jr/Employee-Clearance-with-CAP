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
}

type ReqStatus : String enum {
    Pending = 'P';
    Approved = '   ';
    Rejected = 'R';
}

// Attahcments
entity Attahcments {
    empD      : Association to empDetails;
    content   : LargeBinary
                       @Core.MediaType                  : mediaType
                       @Core.ContentDisposition.Filename: FileName
                       @Core.ContentDisposition.Type    : 'inline';
    mediaType : String @Core.IsMediaType;
    FileName  : String;
}


// employee master Data


//Status Values
