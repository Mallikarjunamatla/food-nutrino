class Usda{
    constructor(){

        this.apiKey = 'FBLGPIhNbKXsjQrrysnZ0SsRAjskg54JkfhQdLtN';
        this.pageNumber = 1;


    }

    async getFood(food,pageVal){
        const foodData = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&pageNumber=${pageVal}&api_key=${this.apiKey}`);
        const foodProfile = await foodData.json();

        return{
            foodProfile 
        }
    }
    firstPage(){
          this.pageNumber = 1;
          return this.pageNumber;
    }
    nextPage(){
        if(this.pageNumber >=1 && this.pageNumber <200 ){
            this.pageNumber=this.pageNumber+1;

        }
        
       return this.pageNumber;
        
    }
    previousPage(){
        if(this.pageNumber >1 && this.pageNumber <=200 )
        {
            this.pageNumber-=1;
        }
     return this.pageNumber;
        
    }
    lastPage(totalPages){
        if(totalPages > 200){
            this.pageNumber = 200;
        }
        else{
            this.pageNumber = totalPages;
        }
       return this.pageNumber;
        
    }


    
}