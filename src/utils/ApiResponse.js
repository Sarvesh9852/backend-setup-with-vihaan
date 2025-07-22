class ApiResponse{
     constructor(ststusCode,data,message = "sucess"){ //// kyuki ye api response h to ye sucess message hoga hi hoga..
        this.ststusCode = ststusCode
        this.deta = deta
        this.message = message
        This.success = ststusCode < 400
  
     } 
}

export {ApiResponse}