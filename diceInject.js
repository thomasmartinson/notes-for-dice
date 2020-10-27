$(document).ready(function(){
  // wait until search results load
  let interval_id = setInterval(function(){
    results = $("div.search-result");
    if (results.length > 0) {
      debugger;
      inject_info(results);
      clearInterval(interval_id);
    }
  }, 2000);
});

// inject info payload from notes into the search results UI
// results: list of all search result wrapper elements
function inject_info(results) {
  // get all names and ids
  let info = {}; // keys: id, vals: full name
  results.find("label.profile-name a").each(function(){
    info[this.id] = { name: $(this).find("span").text() };
  });

  // a mock payload from Notes
  let payload = info;

  // append to all profile cards
  results.each(function(){
    // get id
    let result_id = $(this).find("label.profile-name a").attr("id");
    
    // append info to card info
    $(this).find("div.card-info-grid.container-fluid").after(`
      <div class="container-fluid" id="notes-${result_id}">
        <div class="row">Name: ${payload[result_id].name}</div>
        <div class="row">Dice ID: ${result_id}</div>
      </div>`
    );
  });
}
