using my.clearance as cl from '../db/schema'  ;

service CatalogService{

    entity clearance  as projection on cl.empDetails ;
    entity Attahcments as projection on cl.Attahcments ;

    //action startClearanceProcess(ID : UUID) returns String;
}
