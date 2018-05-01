addCases
===    
    INSERT INTO casesInfo (patient_id,classfication_id) VALUES (#patientId#,#classficationId#)
    
addEnclosure
===    
    INSERT INTO enclosureInfo (cases_id,local_addr,type,uploding_name,archive_name,network_addr) VALUES (#casesId#,#localAddr#,#type#,#uplodingName#,#archiveName#,#networkAddr#)
    
delCases
===    
    UPDATE casesInfo SET or_delete = #orDelete# WHERE id = #id# 
    
queryCases
===    
    select * from casesInfo where patient_id=#patientId# and or_delete!=#orDelete#
    
queryCasesPicture
===    
      select * from enclosureInfo where cases_id=#casesId# and or_delete!=#orDelete#
      
delCasesPicture
===    
      UPDATE enclosureInfo SET or_delete = #orDelete# WHERE id = #id#    
 
addAdvertising
===    
     INSERT INTO advertisingInfo (local_addr,type,uploding_name,archive_name,network_addr,goto_addr,role_id) VALUES (#localAddr#,#type#,#uplodingName#,#archiveName#,#networkAddr#,#gotoUrl#,#roleId#)

queryAdcertising
===    
     select * from advertisingInfo where role_id=#roleId# and or_delete!=#orDelete#    