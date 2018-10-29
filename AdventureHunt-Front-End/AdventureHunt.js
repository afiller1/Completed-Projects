/*
  This is a very simple example of a web front end for a publicly available web service.
  Due to its pedagogical nature, comments are more elaborate than they typically need to
  be, or may even be present when no developer explanation would usually be necessary.

  Further, this example uses JavaScript 2015 syntax.
*/

// Yes, this is a “global.” But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
(() => {
  const setupEventListeners = () => {
    const flightSearchButton = $('#flightSearchButton')
    const carSearchButton = $('#carSearchButton')
    const hotelSearchButton = $('#hotelSearchButton')
    const flightOrigin = $('#flightOrigin')
    const carLocation = $('#carLocation')
    const carPickupDate = $('#carPickupDate')
    const carDropoffDate = $('#carDropoffDate')
    const hotelLocation = $('#hotelLocation')
    const checkInDate = $('#checkInDate')
    const checkOutDate = $('#checkOutDate')

    flightSearchButton.click(
      () => window.ApiService.searchFlights({
        origin: flightOrigin.val(),
      }).then(result => displayFlights(result.data[0].results))
        .catch(() => $('.flightresults').empty().append(
          // This doesn’t really have the requisite three ingredients of a good error message, but this
          // is just starter code after all.
          $('<div></div>')
            .addClass('col alert alert-danger')
            .text('Oops, something went wrong!')
        ))
    )

    hotelSearchButton.click(
      () => window.ApiService.searchHotels({
        location: hotelLocation.val(),
        checkIn: checkInDate.val(),
        checkOut: checkOutDate.val()
      }).then(result => displayHotels(result.data[0].results))
        .catch(() => $('.hotelresults').empty().append(
          // This doesn’t really have the requisite three ingredients of a good error message, but this
          // is just starter code after all.
          $('<div></div>')
            .addClass('col alert alert-danger')
            .text('Oops, something went wrong!')
        ))
    )

    carSearchButton.click(
      () => window.ApiService.searchCars({
        location: carLocation.val(),
        pickup: carPickupDate.val(),
        dropoff: carDropoffDate.val()
      }).then(result => displayCars(result.data[0].results[0].cars))
        .catch(() => $('.carresults').empty().append(
          // This doesn’t really have the requisite three ingredients of a good error message, but this
          // is just starter code after all.
          $('<div></div>')
            .addClass('col alert alert-danger')
            .text('Oops, something went wrong!')
        ))
    )

    flightOrigin.bind('input', () => flightSearchButton.prop('disabled', !flightOrigin.val()))

    let enableDisableSubmitBtn = function(location, inDate, outDate, btn){
      let place = location.val().trim()
      let startDate = inDate.val().trim()
      let endDate = outDate.val().trim()
      let enableBtn = place.length !== 0 && endDate.length !== 0 && startDate.length !== 0
      btn.attr('disabled', !enableBtn)
    }

    carLocation.bind('input', () => enableDisableSubmitBtn(carLocation, carPickupDate, carDropoffDate, carSearchButton))
    carPickupDate.bind('input', () => enableDisableSubmitBtn(carLocation, carPickupDate, carDropoffDate, carSearchButton))
    carDropoffDate.bind('input', () => enableDisableSubmitBtn(carLocation, carPickupDate, carDropoffDate, carSearchButton))

    hotelLocation.bind('input', () => enableDisableSubmitBtn(hotelLocation, checkInDate, checkOutDate, hotelSearchButton))
    checkInDate.bind('input', () => enableDisableSubmitBtn(hotelLocation, checkInDate, checkOutDate, hotelSearchButton))
    checkOutDate.bind('input', () => enableDisableSubmitBtn(hotelLocation, checkInDate, checkOutDate, hotelSearchButton))

  }

  const flightResults = listFlights => $('<li></li>').addClass('list-group-item').text("DESTINATION: " +
    listFlights.destination + "; PRICE: $" + listFlights.price + "; DEPARTURE DATE: " + listFlights.departure_date +
    "; RETURN DATE: " + listFlights.return_date)

  const hotelResults = listHotels => $('<li></li>').addClass('list-group-item').text("PROPERTY NAME: " +
    listHotels.property_name + "; ADDRESS: " + listHotels.address.line1 + ", " + listHotels.address.city +
    ", " + listHotels.address.region + "; TOTAL PRICE: $" + listHotels.total_price.amount)

  const carResults = listCars => $('<li></li>').addClass('list-group-item').text(
    "AVAILABLE CAR: " + listCars.vehicle_info.category + listCars.vehicle_info.type +
    "; ESTIMATED TOTAL PRICE: " + listCars.estimated_total.amount)

  const displayFlights = appendFlights => $('.flightresults').empty().append(
    // Receiving the response renders it in an HTML element tree then appends
    // it to the element(s) with the class image-result-container.
    appendFlights.map(flightResults)
  )

  const displayHotels = appendHotels => $('.hotelresults').empty().append(
    // Receiving the response renders it in an HTML element tree then appends
    // it to the element(s) with the class image-result-container.
    appendHotels.map(hotelResults)
  )

  const displayCars = appendCars => $('.carresults').empty().append(
    // Receiving the response renders it in an HTML element tree then appends
    // it to the element(s) with the class image-result-container.
    appendCars.map(carResults)
  )

  const init = () => {
    window.ApiService.apiHost('https://sandbox.amadeus.com/api-catalog')
    setupEventListeners()
  }

  window.AdventureHuntSearchController = {
    init
  }
})()
