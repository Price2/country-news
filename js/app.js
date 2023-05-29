var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
      this.events[eventName] = this.events[eventName]
        ? this.events[eventName]
        : [];
      this.events[eventName].push(callbackfn);
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function (callBackfn) {
          callBackfn(data);
        });
      }
    },
  };
//   eventsMediator.on("people.increment", function () {});
//   ​
//   eventsMediator.emit("people.increment", this.data);


var carouselModel =
{
    currentNews:[],
carouselData:[
    {id: 1,
        name:"argentine",
        src: "images/ar.svg",
        api:"https://newsapi.org/v2/top-headlines?country=ar&apiKey=1149315625ce46f4bc647230021d35ab" },
    {id:2,
        name:"greece",
        src: "images/gr.svg",
        api:"https://newsapi.org/v2/top-headlines?country=gr&apiKey=1149315625ce46f4bc647230021d35ab",
        currentNews:[] },
    {
        id:3,
    name:"netherlands",
    src: "images/nl.svg",
    api:"https://newsapi.org/v2/top-headlines?country=nl&apiKey=1149315625ce46f4bc647230021d35ab",
    currentNews:[] },
{
    id:4,
    name:"south africa",
    src: "images/za.svg",
    api:"https://newsapi.org/v2/top-headlines?country=za&apiKey=1149315625ce46f4bc647230021d35ab",
    currentNews:[] }
],

init: function() {
    
}
    
}




var countriesController =
{
    init: function(){
        countriesFlagView.init()
    },

    getNews: function(country_id){

        carouselModel.carouselData.forEach(element => {
            if (element.id == country_id){
                console.log(element.id)
            $.ajax(element.api,   // request url
                {
                    success: function (data, status, xhr) {// success callback function
                        carouselModel.currentNews = data.articles
                        cardView.render()
                        console.log(carouselModel.currentNews)


                },
                error: function (jqXhr, textStatus, errorMessage) { // error callback 
                    console.log("error :" +errorMessage)
                }
            });

            }
        });
   

    },
    getcarouselData: function(){
        return carouselModel.carouselData
    }

}



var countriesFlagView ={
    
    init: function(){
        this.template = document.getElementById('template').innerHTML;
        this.parent = document.getElementById('parent-1')
        this.rendered = Mustache.render(this.template, { id: "1",src: 'images/ar.svg' });            
        this.parent.innerHTML += this.rendered;
        eventsMediator.on("imageClick", function(img) {countriesController.getNews(img)});
        this.render();
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            // nav:true,
            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        })
    },
    
    render: function() {

        var carousel = countriesController.getcarouselData();
        this.parent.innerHTML = ""
        for (let i = 0; i < carousel.length; i++) {
            this.rendered = Mustache.render(this.template, { id:carousel[i].id , src: carousel[i].src });            
            document.getElementById('parent-1').innerHTML += this.rendered;
        }

        $("img").click(function () { 
            // debugger
            eventsMediator.emit("imageClick", this.id);
        });
        }
    }


var cardView = {
init: function(){
    

this.render()
},
render: function() {
    // debugger
    this.parent = document.getElementById('card-wrapper')
    this.parent.innerHTML = "";
    this.template = document.getElementById('template-card').innerHTML;
        this.rendered = Mustache.render(this.template, {currentNews: carouselModel.currentNews});            
        this.parent.innerHTML += this.rendered;
}
}

$(document).ready(function () {
    
    countriesController.init()
});