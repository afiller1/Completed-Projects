// When starting a front end, it is usual to first separate out the functions which will be implemented by
// a web service. This module demonstrates how such a “mock” service can look. Note how the external interface
// of the final ApiService object matches the one in api.js. That’s because, in reality, this file is actually
// how api.js _starts_, and it morphs into the final api.js when you connect to the web service for real.
(() => {
  const searchFlights = () => Promise.resolve({
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
          },
          {
            "destination": "FLL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "114.40",
            "airline": "NK"
          },
          {
            "destination": "BTV",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "116.40",
            "airline": "B6"
          },
          {
            "destination": "WAS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "116.40",
            "airline": "B6"
          },
          {
            "destination": "CVG",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "118.40",
            "airline": "UA"
          },
          {
            "destination": "CHI",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "120.40",
            "airline": "UA"
          },
          {
            "destination": "ORL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-18",
            "price": "126.40",
            "airline": "F9"
          },
          {
            "destination": "MIA",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "126.40",
            "airline": "F9"
          },
          {
            "destination": "SYR",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "128.40",
            "airline": "B6"
          },
          {
            "destination": "MYR",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-09",
            "price": "130.40",
            "airline": "NK"
          },
          {
            "destination": "ORF",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "136.40",
            "airline": "AA"
          },
          {
            "destination": "BUF",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "136.40",
            "airline": "B6"
          },
          {
            "destination": "ROC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "136.40",
            "airline": "UA"
          },
          {
            "destination": "MHT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "136.40",
            "airline": "DL"
          },
          {
            "destination": "DFW",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "136.40",
            "airline": "AA"
          },
          {
            "destination": "CLT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-20",
            "price": "144.90",
            "airline": "UA"
          },
          {
            "destination": "BOS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-14",
            "price": "146.40",
            "airline": "B6"
          },
          {
            "destination": "DTT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "146.40",
            "airline": "NK"
          },
          {
            "destination": "PIT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "156.40",
            "airline": "AA"
          },
          {
            "destination": "RDU",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "156.40",
            "airline": "UA"
          },
          {
            "destination": "TYS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "156.40",
            "airline": "UA"
          },
          {
            "destination": "CHS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-07",
            "price": "161.60",
            "airline": "DL"
          },
          {
            "destination": "CLE",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "162.40",
            "airline": "DL"
          },
          {
            "destination": "DEN",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "166.40",
            "airline": "UA"
          },
          {
            "destination": "SAV",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "168.40",
            "airline": "UA"
          },
          {
            "destination": "ILM",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "170.60",
            "airline": "AA"
          },
          {
            "destination": "SDF",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "174.90",
            "airline": "UA"
          },
          {
            "destination": "CMH",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "176.40",
            "airline": "AA"
          },
          {
            "destination": "CAE",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "176.40",
            "airline": "DL"
          },
          {
            "destination": "ATL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "176.40",
            "airline": "DL"
          },
          {
            "destination": "MSY",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "176.40",
            "airline": "B6"
          },
          {
            "destination": "CAK",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "176.60",
            "airline": "AA"
          },
          {
            "destination": "RIC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "177.63",
            "airline": "B6"
          },
          {
            "destination": "BNA",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "177.63",
            "airline": "B6"
          },
          {
            "destination": "IND",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "182.40",
            "airline": "UA"
          },
          {
            "destination": "DAY",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "184.60",
            "airline": "DL"
          },
          {
            "destination": "GSO",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "186.40",
            "airline": "UA"
          },
          {
            "destination": "PBI",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-19",
            "price": "186.40",
            "airline": "B6"
          },
          {
            "destination": "HOU",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "186.40",
            "airline": "NK"
          },
          {
            "destination": "YTO",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "186.84",
            "airline": "AC"
          },
          {
            "destination": "JAX",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "188.40",
            "airline": "UA"
          },
          {
            "destination": "OMA",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "192.10",
            "airline": "AA"
          },
          {
            "destination": "MSP",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-15",
            "price": "193.63",
            "airline": "B6"
          },
          {
            "destination": "GSP",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-09",
            "price": "193.90",
            "airline": "DL"
          },
          {
            "destination": "MSN",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "196.40",
            "airline": "UA"
          },
          {
            "destination": "STL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "196.40",
            "airline": "UA"
          },
          {
            "destination": "MKC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "196.40",
            "airline": "UA"
          },
          {
            "destination": "TPA",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "198.40",
            "airline": "UA"
          },
          {
            "destination": "MKE",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-18",
            "price": "200.60",
            "airline": "DL"
          },
          {
            "destination": "GRR",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "203.60",
            "airline": "DL"
          },
          {
            "destination": "OKC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "203.60",
            "airline": "DL"
          },
          {
            "destination": "SAT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "203.60",
            "airline": "DL"
          },
          {
            "destination": "RNO",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "203.60",
            "airline": "UA"
          },
          {
            "destination": "BHM",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "206.40",
            "airline": "DL"
          },
          {
            "destination": "MEM",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "206.40",
            "airline": "UA"
          },
          {
            "destination": "AVL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "206.60",
            "airline": "AA"
          },
          {
            "destination": "LAS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "209.40",
            "airline": "UA"
          },
          {
            "destination": "FMY",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-19",
            "price": "210.40",
            "airline": "UA"
          },
          {
            "destination": "SRQ",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "210.60",
            "airline": "AA"
          },
          {
            "destination": "YMQ",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "210.95",
            "airline": "AC"
          },
          {
            "destination": "YUL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "211.19",
            "airline": "AC"
          },
          {
            "destination": "YOW",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "212.93",
            "airline": "AC"
          },
          {
            "destination": "LIT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "214.60",
            "airline": "DL"
          },
          {
            "destination": "AUS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "216.40",
            "airline": "B6"
          },
          {
            "destination": "PNS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "220.60",
            "airline": "AA"
          },
          {
            "destination": "ABQ",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "229.60",
            "airline": "AA"
          },
          {
            "destination": "PSP",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "236.40",
            "airline": "B6"
          },
          {
            "destination": "SFO",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "236.40",
            "airline": "UA"
          },
          {
            "destination": "SEA",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-09",
            "price": "236.40",
            "airline": "B6"
          },
          {
            "destination": "BUR",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "236.40",
            "airline": "B6"
          },
          {
            "destination": "PDX",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "236.40",
            "airline": "AS"
          },
          {
            "destination": "ONT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "236.40",
            "airline": "B6"
          },
          {
            "destination": "COS",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "237.60",
            "airline": "UA"
          },
          {
            "destination": "STX",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "238.32",
            "airline": "NK"
          },
          {
            "destination": "SNA",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "239.10",
            "airline": "UA"
          },
          {
            "destination": "TUL",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "240.60",
            "airline": "AA"
          },
          {
            "destination": "YHZ",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "240.63",
            "airline": "UA"
          },
          {
            "destination": "SJC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "241.10",
            "airline": "UA"
          },
          {
            "destination": "SJU",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-18",
            "price": "243.80",
            "airline": "B6"
          },
          {
            "destination": "SAC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "246.60",
            "airline": "AA"
          },
          {
            "destination": "SDQ",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "247.63",
            "airline": "NK"
          },
          {
            "destination": "SLC",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-20",
            "price": "250.40",
            "airline": "B6"
          },
          {
            "destination": "LAX",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-08",
            "price": "252.40",
            "airline": "UA"
          },
          {
            "destination": "YWG",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-11",
            "price": "254.41",
            "airline": "UA"
          },
          {
            "destination": "PHX",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-12",
            "price": "256.40",
            "airline": "UA"
          },
          {
            "destination": "OAK",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-10",
            "price": "256.60",
            "airline": "AA"
          },
          {
            "destination": "CUN",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-20",
            "price": "258.92",
            "airline": "AA"
          },
          {
            "destination": "STT",
            "departure_date": "2018-12-05",
            "return_date": "2018-12-06",
            "price": "261.14",
            "airline": "NK"
          }
        ]
      }
    ]
  })

  const searchHotels = () => Promise.resolve({
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
        },
        {
          "property_code": "LQBOSCZB",
          "property_name": "La Quinta Inn Ste Boston Somerville",
          "marketing_text": "Located 3 miles north of Boston, the La Quinta Inn & Suites" +
          " Boston Somerville hotel is near LEGOLAND Discovery Center Boston, Harvard University," +
          " MIT, Bunker Hill Monument and downtown Boston.",
          "location": {
            "latitude": 42.39432,
            "longitude": -71.08479
          },
          "address": {
            "line1": "23 Cummings Street",
            "city": "Somerville",
            "region": "MA",
            "postal_code": "02145",
            "country": "US"
          },
          "total_price": {
            "amount": "110.58",
            "currency": "USD"
          },
          "min_daily_rate": {
            "amount": "99.00",
            "currency": "USD"
          },
          "contacts": [
            {
              "type": "PHONE",
              "detail": "+1 617 625-5300"
            },
            {
              "type": "FAX",
              "detail": "+1 617 625-5930"
            },
            {
              "type": "EMAIL",
              "detail": "lq2003gm@laquinta.com"
            },
            {
              "type": "URL",
              "detail": "http://2003.lq.com"
            }
          ],
          "amenities": [
            {
              "amenity": "FRONT_DESK_24_HOURS",
              "ota_code": 1,
              "description": "24-hour front desk"
            },
            {
              "amenity": "",
              "ota_code": 7,
              "description": "ATM/Cash machine"
            },
            {
              "amenity": "CONCIERGE_DESK",
              "ota_code": 22,
              "description": "Concierge desk"
            },
            {
              "amenity": "ELEVATORS",
              "ota_code": 33,
              "description": "Elevators"
            },
            {
              "amenity": "EXPRESS_CHECK_OUT",
              "ota_code": 37,
              "description": "Express check-out"
            },
            {
              "amenity": "",
              "ota_code": 41,
              "description": "Free airport shuttle"
            },
            {
              "amenity": "",
              "ota_code": 56,
              "description": "Jogging track"
            },
            {
              "amenity": "PARKING",
              "ota_code": 68,
              "description": "Parking"
            },
            {
              "amenity": "RESTAURANT",
              "ota_code": 76,
              "description": "Restaurant"
            },
            {
              "amenity": "SAFE_DEPOSIT_BOX",
              "ota_code": 78,
              "description": "Safe deposit box"
            },
            {
              "amenity": "",
              "ota_code": 91,
              "description": "Tour/sightseeing desk"
            },
            {
              "amenity": "",
              "ota_code": 92,
              "description": "Translation services"
            },
            {
              "amenity": "",
              "ota_code": 100,
              "description": "Wakeup service"
            },
            {
              "amenity": "",
              "ota_code": 106,
              "description": "Bell staff/porter"
            },
            {
              "amenity": "INTERNET_PUBLIC_AREAS",
              "ota_code": 178,
              "description": "Internet access in public areas"
            },
            {
              "amenity": "",
              "ota_code": 179,
              "description": "Wireless internet connection in public areas"
            },
            {
              "amenity": "NON_SMOKING_ROOM",
              "ota_code": 198,
              "description": "Non-smoking rooms (generic)"
            },
            {
              "amenity": "CHILDREN_WELCOME",
              "ota_code": 218,
              "description": "Children welcome"
            },
            {
              "amenity": "PETS_ALLOWED",
              "ota_code": 224,
              "description": "Pets allowed"
            }
          ],
          "awards": [
            {
              "provider": "AAA",
              "rating": "3"
            },
            {
              "provider": "AA Star Rating",
              "rating": "3"
            },
            {
              "provider": "Mobil",
              "rating": "3"
            },
            {
              "provider": "OHG",
              "rating": "4"
            },
            {
              "provider": "Star Rating",
              "rating": "3"
            }
          ],
          "images": [],
          "rooms": [
            {
              "booking_code": "A0AAAO",
              "room_type_code": "H1D",
              "rate_plan_code": "RAC",
              "total_amount": {
                "amount": "110.58",
                "currency": "USD"
              },
              "rates": [
                {
                  "start_date": "2018-12-15",
                  "end_date": "2018-12-16",
                  "currency_code": "USD",
                  "price": 99
                }
              ],
              "descriptions": [
                "Best Available Rate",
                "One Queen/Mobility Accessible/Nonsmoking",
                "Ultra Fast Free Internet/Free Breakfast/HDTV"
              ],
              "room_type_info": {
                "room_type": "Room with shower - Minimum",
                "bed_type": "Double",
                "number_of_beds": "1"
              },
              "rate_type_code": "RAC"
            }
          ],
          "_links": {
            "more_rooms_at_this_hotel": {
              "href":
              "https://api.sandbox.amadeus.com/v1.2/hotels/LQBOSCZB?apikey=" +
              "Tmqo2jhYR3pqXEb5sz4eDYvZb4tDIzac&check_in=2018-12-15&check_out" +
              "=2018-12-16&referrer=more_rooms_at_this_hotel"
            }
          }
        }
      ]}]})


  const searchCars = () => Promise.resolve({
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
              },
              {
                "vehicle_info": {
                  "acriss_code": "ECMR",
                  "transmission": "Manual",
                  "fuel": "Unspecified",
                  "air_conditioning": true,
                  "category": "Economy",
                  "type": "2/4 Door"
                },
                "rates": [
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "38.50",
                      "currency": "USD"
                    }
                  },
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "38.50",
                      "currency": "EUR"
                    }
                  }
                ],
                "images": [
                  {
                    "category": "VEHICLE",
                    "width": 90,
                    "height": 50,
                    "url": "https://multimedia.amadeus.com/mdc/retrieveCarItem?ctg" +
                    "=VEHICLE&prov=EP&cnt=FR&vehcat=ECMR&item=0&stamp=VEHICLE_0_0_" +
                    "1508162404178&file=1.JPEG"
                  }
                ],
                "estimated_total": {
                  "amount": "77.00",
                  "currency": "USD"
                }
              },
              {
                "vehicle_info": {
                  "acriss_code": "CRMR",
                  "transmission": "Manual",
                  "fuel": "Unspecified",
                  "air_conditioning": true,
                  "category": "Compact",
                  "type": "Recreational vehicle"
                },
                "rates": [
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "41.50",
                      "currency": "USD"
                    }
                  },
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "41.50",
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
                    "VEHICLE&prov=EP&cnt=FR&vehcat=CRMR&item=0&stamp=VEHICLE_0_0_148" +
                    "1886903712&file=1.JPEG"
                  }
                ],
                "estimated_total": {
                  "amount": "83.00",
                  "currency": "USD"
                }
              },
              {
                "vehicle_info": {
                  "acriss_code": "CDMR",
                  "transmission": "Manual",
                  "fuel": "Unspecified",
                  "air_conditioning": true,
                  "category": "Compact",
                  "type": "4-5 Door"
                },
                "rates": [
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "41.50",
                      "currency": "USD"
                    }
                  },
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "41.50",
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
                    "VEHICLE&prov=EP&cnt=FR&vehcat=CDMR&item=0&stamp=VEHICLE_0_0_148" +
                    "1886903712&file=1.JPEG"
                  }
                ],
                "estimated_total": {
                  "amount": "83.00",
                  "currency": "USD"
                }
              },
              {
                "vehicle_info": {
                  "acriss_code": "CDMD",
                  "transmission": "Manual",
                  "fuel": "Diesel",
                  "air_conditioning": true,
                  "category": "Compact",
                  "type": "4-5 Door"
                },
                "rates": [
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "44.00",
                      "currency": "USD"
                    }
                  },
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "44.00",
                      "currency": "EUR"
                    }
                  }
                ],
                "images": [
                  {
                    "category": "VEHICLE",
                    "width": 90,
                    "height": 50,
                    "url": "https://multimedia.amadeus.com/mdc/retrieveCarItem?ctg" +
                    "=VEHICLE&prov=EP&cnt=FR&vehcat=CDMD&item=0&stamp=VEHICLE_0_0_15" +
                    "16958102789&file=1.JPEG"
                  }
                ],
                "estimated_total": {
                  "amount": "88.00",
                  "currency": "USD"
                }
              },
              {
                "vehicle_info": {
                  "acriss_code": "DDMR",
                  "transmission": "Manual",
                  "fuel": "Unspecified",
                  "air_conditioning": true,
                  "category": "Compact Elite",
                  "type": "4-5 Door"
                },
                "rates": [
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "48.50",
                      "currency": "USD"
                    }
                  },
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "48.50",
                      "currency": "EUR"
                    }
                  }
                ],
                "images": [
                  {
                    "category": "VEHICLE",
                    "width": 90,
                    "height": 50,
                    "url": "https://multimedia.amadeus.com/mdc/retrieveCarItem?" +
                    "ctg=VEHICLE&prov=EP&cnt=FR&vehcat=DDMR&item=0&stamp=VEHICLE" +
                    "_0_0_1500560104087&file=1.JPEG"
                  }
                ],
                "estimated_total": {
                  "amount": "97.00",
                  "currency": "USD"
                }
              },
              {
                "vehicle_info": {
                  "acriss_code": "CDAR",
                  "transmission": "Automatic",
                  "fuel": "Unspecified",
                  "air_conditioning": true,
                  "category": "Compact",
                  "type": "4-5 Door"
                },
                "rates": [
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "45.50",
                      "currency": "USD"
                    }
                  },
                  {
                    "type": "DAILY",
                    "price": {
                      "amount": "45.50",
                      "currency": "EUR"
                    }
                  }
                ],
                "images": [
                  {
                    "category": "VEHICLE",
                    "width": 90,
                    "height": 50,
                    "url": "https://multimedia.amadeus.com/mdc/retrieveCarItem?" +
                    "ctg=VEHICLE&prov=EP&cnt=FR&vehcat=CDAR&item=0&stamp=VEHICLE_0" +
                    "_0_1481886903712&file=1.JPEG"
                  }
                ],
                "estimated_total": {
                  "amount": "91.00",
                  "currency": "USD"
                }
              }
            ]
          }]}]

  })

  window.ApiService = {
    apiHost: () => {}, // No-op in our mock version.
    searchFlights,
    searchHotels,
    searchCars
  }
})()
