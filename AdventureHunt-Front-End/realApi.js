(() => {
  // This key is secret...shhh!
  const API_KEY = 'OE9AWl9JeQd477skIPd3GYhAPAaAL9kw'
  const baseURL = 'https://api.sandbox.amadeus.com/v1.2/'
  const flightURL = 'flights/inspiration-search?'
  const carURL = 'cars/search-airport?'
  const hotelURL = 'hotels/search-airport?'

  const HTTP_OK = 200

  const throwResponseError = response => {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }

  const emitNativeError = error => {
    throw error
  }

  const statusCheck = successStatuses => response => {
    if (successStatuses.includes(response.status)) {
      return response
    } else {
      throwResponseError(response)
    }
  }

  const okCheck = statusCheck([HTTP_OK])

  const searchFlights = params => {
    const origin = params.origin
    return fetch(`${baseURL}${flightURL}apikey=${API_KEY}&origin=${origin}`)
      .then(okCheck, emitNativeError)
      .then(response => response.json())
  }

  const searchCars = params => {
    const location = params.location
    const pickup = params.pickup
    const dropoff = params.dropoff
    return fetch(`${baseURL}${carURL}apikey=${API_KEY}&location=${location}&pick_up=${pickup}&drop_off=${dropoff}`)
      .then(response => response.json())
  }

  const searchHotels = params => {
    const location = params.location
    const checkIn = params.checkIn
    const checkOut = params.checkOut
    return fetch(`${baseURL}${hotelURL}apikey=${API_KEY}&location=${location}&check_in=${checkIn}&check_out=${checkOut}`)
      .then(response => response.json())
  }

  window.ApiService = {
    apiHost: () => {},
    searchFlights,
    searchCars,
    searchHotels
  }
})()
