describe('AdventureHunt search example', () => {
  beforeEach(() => {
    fixture.setBase('test')
    fixture.load('search.fixture.html')
    window.AdventureHuntSearchController.init()
  })


  afterEach(() => fixture.cleanup())

  it('flight search should start with an empty search field', () => expect($('#flightOrigin').val()).toBe(''))
  it('flight should start with a disabled search button', () => expect($('#flightSearchButton').prop('disabled')).toBe(true))
  it('flight results should start empty', () => expect($('#flightresults').val()).toBe(''))

  it('car location should start with an empty search field', () => expect($('#carLocation').val()).toBe(''))
  it('car pickup should start with an empty search field', () => expect($('#carPickupDate').val()).toBe(''))
  it('car dropoff should start with an empty search field', () => expect($('#carDropoffDate').val()).toBe(''))
  it('car should start with a disabled search button', () => expect($('#carSearchButton').prop('disabled')).toBe(true))
  it('car results should start empty', () => expect($('#carresults').val()).toBe(''))

  it('hotel location should start with an empty search field', () => expect($('#hotelLocation').val()).toBe(''))
  it('hotel checkin should start with an empty search field', () => expect($('#checkInDate').val()).toBe(''))
  it('hotel checkout should start with an empty search field', () => expect($('#checkOutDate').val()).toBe(''))
  it('hotel should start with a disabled search button', () => expect($('#hotelSearchButton').prop('disabled')).toBe(true))
  it('hotel results should start empty', () => expect($('#hotelresults').val()).toBe(''))

  describe('search button', () => {
    let flightOrigin
    let flightSearchButton
    let carLocation
    let carPickupDate
    let carDropoffDate
    let carSearchButton
    let hotelLocation
    let checkInDate
    let checkOutDate
    let hotelSearchButton

    beforeEach(() => {
      flightOrigin = $('#flightOrigin')
      flightSearchButton = $('#flightSearchButton')
      carLocation = $('#carLocation')
      carPickupDate = $('#carPickupDate')
      carDropoffDate = $('#carDropoffDate')
      carSearchButton = $('#carSearchButton')
      hotelLocation = $('#hotelLocation')
      checkInDate = $('#checkInDate')
      checkOutDate = $('#checkOutDate')
      hotelSearchButton = $('#hotelSearchButton')
    })

    it('should be enabled when the search field is not blank', () => {
      flightOrigin.val('testing').trigger('input')
      expect(flightSearchButton.prop('disabled')).toBe(false)

      carLocation.val('testing').trigger('input')
      carPickupDate.val("2018-10-24").trigger('input')
      carDropoffDate.val("2018-10-24").trigger('input')
      expect(carSearchButton.prop('disabled')).toBe(false)

      hotelLocation.val('testing').trigger('input')
      checkInDate.val("2018-10-24").trigger('input')
      checkOutDate.val("2018-10-24").trigger('input')
      expect(hotelSearchButton.prop('disabled')).toBe(false)

    })

    it('should be disabled when the search field is blank', () => {
      flightOrigin.val('').trigger('input')
      expect(flightSearchButton.prop('disabled')).toBe(true)

      carLocation.val('').trigger('input')
      expect(carSearchButton.prop('disabled')).toBe(true)
      carPickupDate.val('').trigger('input')
      expect(carSearchButton.prop('disabled')).toBe(true)
      carDropoffDate.val('').trigger('input')
      expect(carSearchButton.prop('disabled')).toBe(true)

      hotelLocation.val('').trigger('input')
      expect(hotelSearchButton.prop('disabled')).toBe(true)
      checkInDate.val('').trigger('input')
      expect(hotelSearchButton.prop('disabled')).toBe(true)
      checkOutDate.val('').trigger('input')
      expect(hotelSearchButton.prop('disabled')).toBe(true)
    })
  })

  // TEST API

  const FETCH_COMPLETION_DELAY = 250

  describe('API calls', () => {
    beforeEach(() => {
      sinon.stub(window.ApiService, 'searchFlights')
      sinon.stub(window.ApiService, 'searchCars')
      sinon.stub(window.ApiService, 'searchHotels')

      window.ApiService.searchFlights.returns(Promise.resolve({
        data: [
          {
            "origin": "NYC",
            "currency": "USD",
            "results": [
              {
                "destination": "PWM",
                "departure_date": "2018-12-05",
                "return_date": "2018-12-12",
                "price": "108.40",
                "airline": "B6"
              }
            ]
          }
        ]
      }))

      window.ApiService.searchCars.returns(Promise.resolve({
        data: [
          {
            "results": [
              {
                "provider": {
                  "company_code": "EP",
                  "company_name": "EUROPCAR"
                },
                "branch_id": "NCET02",
                "location": {
                  "latitude": 43.66528,
                  "longitude": 7.215
                },
                "airport": "NCE",
                "address": {
                  "line1": "NICE COTE D AZUR AIRPORT",
                  "city": "NICE",
                  "postal_code": "06281",
                  "country": "FR"
                },
                "cars": [
                  {
                    "vehicle_info": {
                      "acriss_code": "MBMR",
                      "transmission": "Manual",
                      "fuel": "Unspecified",
                      "air_conditioning": true,
                      "category": "Mini",
                      "type": "2-3 Door"
                    },
                    "rates": [
                      {
                        "type": "DAILY",
                        "price": {
                          "amount": "36.00",
                          "currency": "USD"
                        }
                      },
                      {
                        "type": "DAILY",
                        "price": {
                          "amount": "36.00",
                          "currency": "EUR"
                        }
                      }
                    ],
                    "images": [
                      {
                        "category": "VEHICLE",
                        "width": 90,
                        "height": 50,
                        "url": "https://multimedia.amadeus.com/mdc/retrieveCarItem?ctg=" +
                          "VEHICLE&prov=EP&cnt=FR&vehcat=MBMR&item=0&stamp=VEHICLE_0_0_150" +
                          "8162404178&file=1.JPEG"
                      }
                    ],
                    "estimated_total": {
                      "amount": "72.00",
                      "currency": "USD"
                    }
                  }]
              }]}]}))

      window.ApiService.searchHotels.returns(Promise.resolve({
        data: [
          { "results": [
            {
              "property_code": "FNJHYBGF",
              "property_name": "Fairfield Inn N Stes Marriott",
              "location": {
                "latitude": 42.37282,
                "longitude": -71.0796
              },
              "address": {
                "line1": "215 Monsignor Obren Highway",
                "city": "Cambridge",
                "region": "MA",
                "postal_code": "02141",
                "country": "US"
              },
              "total_price": {
                "amount": "105.00",
                "currency": "USD"
              },
              "min_daily_rate": {
                "amount": "105.00",
                "currency": "USD"
              },
              "contacts": [
                {
                  "type": "PHONE",
                  "detail": "1-617-6211999"
                },
                {
                  "type": "FAX",
                  "detail": "1-617-6211998"
                }
              ],
              "amenities": [
                {
                  "amenity": "ICE_MACHINE",
                  "ota_code": 52,
                  "description": "Ice machine"
                },
                {
                  "amenity": "RESTAURANT",
                  "ota_code": 76,
                  "description": "Restaurant"
                },
                {
                  "amenity": "ACCESSIBLE_FACILITIES",
                  "ota_code": 47,
                  "description": "Accessible facilities"
                },
                {
                  "amenity": "INTERNET_PUBLIC_AREAS",
                  "ota_code": 178,
                  "description": "Internet access in public areas"
                },
                {
                  "amenity": "LAUNDRY_SERVICE",
                  "ota_code": 58,
                  "description": "Laundry/Valet service"
                },
                {
                  "amenity": "LOUNGE_BARS",
                  "ota_code": 165,
                  "description": "Lounges/bars"
                },
                {
                  "amenity": "SAFE_DEPOSIT_BOX",
                  "ota_code": 78,
                  "description": "Safe deposit box"
                }
              ],
              "awards": [],
              "images": [],
              "rooms": [
                {
                  "booking_code": "XMIA00",
                  "room_type_code": "XMI",
                  "rate_plan_code": "S9R",
                  "total_amount": {
                    "amount": "105.00",
                    "currency": "USD"
                  },
                  "rates": [
                    {
                      "start_date": "2018-12-15",
                      "end_date": "2018-12-16",
                      "currency_code": "USD",
                      "price": 105
                    }
                  ],
                  "descriptions": [
                    "Marriott Senior Discount, 62 years and older valid ID required",
                    "1 King, Mini fridge, Microwave, Wireless intern",
                    "et, complimentary, Wired internet, for a fee, C"
                  ],
                  "room_type_info": {},
                  "rate_type_code": "S9R"
                }
              ],
              "_links": {
                "more_rooms_at_this_hotel": {
                  "href": "https://api.sandbox.amadeus.com/v1.2/hotels/FNJHYBGF?" +
                  "apikey=Tmqo2jhYR3pqXEb5sz4eDYvZb4tDIzac&check_in=2018-12-15&check_" +
                  "out=2018-12-16&referrer=more_rooms_at_this_hotel"
                }
              }
            }
          ]}
        ]
      }))

      $('#flightOrigin').val('hello')
      $('#flightSearchButton').click()

      $('#hotelLocation').val('hello')
      $('#checkInDate').val('2018-10-24')
      $('#checkOutDate').val('2018-10-29')
      $('#hotelSearchButton').click()

      $('#carLocation').val('hello')
      $('#carPickupDate').val('2018-10-24')
      $('#carDropoffDate').val('2018-10-29')
      $('#carSearchButton').click()
    })

    afterEach(() => window.ApiService.searchFlights.restore())
    afterEach(() => window.ApiService.searchCars.restore())
    afterEach(() => window.ApiService.searchHotels.restore())

    it('should trigger a flight search when the search button is clicked', () =>
      expect(window.ApiService.searchFlights.firstCall.args[0]).toEqual({
        origin: 'hello'
      })
    )

    it('should trigger a car search when the search button is clicked', () =>
      expect(window.ApiService.searchCars.firstCall.args[0]).toEqual({
        location: 'hello',
        pickup: '2018-10-24',
        dropoff: '2018-10-29'
      })
    )

    it('should trigger a hotel search when the search button is clicked', () =>
      expect(window.ApiService.searchHotels.firstCall.args[0]).toEqual({
        location: 'hello',
        checkIn: '2018-10-24',
        checkOut: '2018-10-29'
      })
    )

    it('should populate flight results container when search results arrive', done => setTimeout(() => {
      expect($('.flightresults').children().length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))

    it('should populate hotel results container when search results arrive', done => setTimeout(() => {
      expect($('.hotelresults').children().length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))

    it('should populate car results container when search results arrive', done => setTimeout(() => {
      expect($('.carresults').children().length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))
  })

  describe('failed flight API calls', () => {
    beforeEach(() => {
      sinon.stub(window.ApiService, 'searchFlights')
      window.ApiService.searchFlights.returns(Promise.reject('Mock failure'))

      $('#flightOrigin').val('hello failure')
      $('#flightSearchButton').click()
    })

    afterEach(() => window.ApiService.searchFlights.restore())

    it('should display an alert when the API call fails', done => setTimeout(() => {
      expect($('.flightresults').find('.alert.alert-danger').length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))
  })

  describe('failed hotel API calls', () => {
    beforeEach(() => {
      sinon.stub(window.ApiService, 'searchHotels')
      window.ApiService.searchHotels.returns(Promise.reject('Mock failure'))

      $('#hotelLocation').val('hello failure')
      $('#checkInDate').val('2018-10-24')
      $('#checkOutDate').val('2018-10-29')
      $('#hotelSearchButton').click()
    })

    afterEach(() => window.ApiService.searchHotels.restore())

    it('should display an alert when the API call fails', done => setTimeout(() => {
      expect($('.hotelresults').find('.alert.alert-danger').length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))
  })

  describe('failed car API calls', () => {
    beforeEach(() => {
      sinon.stub(window.ApiService, 'searchCars')
      window.ApiService.searchCars.returns(Promise.reject('Mock failure'))

      $('#carLocation').val('hello failure')
      $('#carPickupDate').val('2018-10-24')
      $('#carDropoffDate').val('2018-10-29')
      $('#carSearchButton').click()
    })

    afterEach(() => window.ApiService.searchCars.restore())

    it('should display an alert when the API call fails', done => setTimeout(() => {
      expect($('.carresults').find('.alert.alert-danger').length).toBe(1)
      done()
    }, FETCH_COMPLETION_DELAY))
  })
})
