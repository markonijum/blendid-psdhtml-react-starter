// var lmore = require('./load-more');
// console.log(lmore);
class CustomLoadMore {
  constructor(selector,options = {}){
    var self = this;
      $(document).ready(function(){
        self.init(selector,options);
    });
  }

  init(selector,options){
    var that = this;
    var loader = $(selector);
    var lm = require('./load-more');
    // console.log(this.lm());
    this.default = {
      selector: '.job-position',
      loadBtn: '#loadmore',
      limit: 3,
      load: 3,
      animate: true,
      animateIn: 'fadeInUp' 
    };
    $.extend(this.default,options);
    loader.loadMore(this.default);
    // this.lm.loadmore(this.default);
  }
}

module.exports = CustomLoadMore;