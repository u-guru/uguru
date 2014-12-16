// Samir's code for scraping forbes top schoools
// http://www.forbes.com/top-colleges/list/#page:1_sort:4_direction:desc_search:_filter:All%20states
// 
var school_dict = {};
$('#listbody tr').each(
   function(index, element) {
       var school_name = $(this).children(':nth-child(2)').children('a').children('h3').text();
       school_dict[school_name] = {
           'forbes_rank': $(this).children(':nth-child(1)').text(),
           'forbes_url': $(this).children(':nth-child(2)').children('a').attr('href'),
           'state': $(this).children(':nth-child(3)').text(),
           'logo_url': $(this).children(':nth-child(2)').children('a').children('img').attr('src'),
           'cost': $(this).children(':nth-child(4)').text(),
           'population': $(this).children(':nth-child(5)').text()
       };
   });
console.log(JSON.stringify(school_dict));