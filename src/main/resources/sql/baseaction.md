downLode
===    
    SELECT * from appUpdataLog where versionSrc=#versionSrc# ORDER BY upDataTime DESC LIMIT 1
    
addVersionLog
===    
    INSERT INTO appUpdataLog (versionNo,versionCode,versionName,versionAddr,upDataTime,versionSrc) VALUES (#versionNo#,#versionCode#,#versionName#,#versionAddr#,#upDataTime#,#versionSrc#)
    
addUser
===    
    INSERT INTO userInfo (account,phoneNo,password) VALUES (#account#,#phoneNo#,#password#)
    
addCode
===    
    INSERT INTO securityCodeLog (securityCode,phoneNo,createTime,type,userId) VALUES (#securityCode#,#phoneNo#,#createTime#,#type#,#userId#)
    
queryUser
===    
    SELECT * from userInfo where phoneNo=#phoneNo#  
     
queryCode
===    
    SELECT * from securityCodeLog where phoneNo=#phoneNo# and securityCode=#securityCode# and type=#type# ORDER BY createTime DESC LIMIT 1
    
updataCode
===    
    UPDATE securityCodeLog SET oruse = #orUse# WHERE id = #id#  
 
 login
===    
    SELECT * from userInfo where account=#account#  and password=#password#
    
    
     