using my.clearance as cl from '../db/schema'  ;

service CatalogService{

    entity clearance  as projection on cl.empDetails ; 
}