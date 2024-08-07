const countries = [
  { code: "", name: "All Countries", coord: [0, 0] },
  { code: "AR", name: "Argentina", coords: [-38.4161, -63.6167] },
  { code: "AS", name: "American Samoa", coords: [-14.271, -170.132] },
  { code: "AT", name: "Austria", coords: [47.5162, 14.5501] },
  { code: "AU", name: "Australia", coords: [-25.2744, 133.7751] },
  { code: "AW", name: "Aruba", coords: [12.5211, -69.9683] },
  { code: "AX", name: "Åland Islands", coords: [60.1785, 19.9156] },
  { code: "AZ", name: "Azerbaijan", coords: [40.1431, 47.5769] },
  { code: "BA", name: "Bosnia and Herzegovina", coords: [43.9159, 17.6791] },
  { code: "BB", name: "Barbados", coords: [13.1939, -59.5432] },
  { code: "BD", name: "Bangladesh", coords: [23.685, 90.3563] },
  { code: "BE", name: "Belgium", coords: [50.5039, 4.4699] },
  { code: "BF", name: "Burkina Faso", coords: [12.2383, -1.5616] },
  { code: "BG", name: "Bulgaria", coords: [42.7339, 25.4858] },
  { code: "BH", name: "Bahrain", coords: [26.0667, 50.5577] },
  { code: "BI", name: "Burundi", coords: [-3.3731, 29.9189] },
  { code: "BJ", name: "Benin", coords: [9.3077, 2.3158] },
  { code: "BL", name: "Saint Barthélemy", coords: [17.9, -62.8333] },
  { code: "BM", name: "Bermuda", coords: [32.3078, -64.7505] },
  { code: "BN", name: "Brunei Darussalam", coords: [4.5353, 114.7277] },
  { code: "BO", name: "Bolivia", coords: [-16.2902, -63.5887] },
  {
    code: "BQ",
    name: "Bonaire, Sint Eustatius and Saba",
    coords: [12.1784, -68.2385],
  },
  { code: "BR", name: "Brazil", coords: [-14.235, -51.9253] },
  { code: "BS", name: "Bahamas", coords: [25.0343, -77.3963] },
  { code: "BT", name: "Bhutan", coords: [27.5142, 90.4336] },
  { code: "BV", name: "Bouvet Island", coords: [-54.4232, 3.4132] },
  { code: "BW", name: "Botswana", coords: [-22.3285, 24.6849] },
  { code: "BY", name: "Belarus", coords: [53.7098, 27.9534] },
  { code: "BZ", name: "Belize", coords: [17.1899, -88.4976] },
  { code: "CA", name: "Canada", coords: [56.1304, -106.3468] },
  { code: "CC", name: "Cocos (Keeling) Islands", coords: [-12.1642, 96.8708] },
  {
    code: "CD",
    name: "Congo, Democratic Republic of the",
    coords: [-4.0383, 21.7587],
  },
  { code: "CF", name: "Central African Republic", coords: [6.6111, 20.9394] },
  { code: "CG", name: "Congo", coords: [-0.228, 15.8277] },
  { code: "CH", name: "Switzerland", coords: [46.8182, 8.2275] },
  { code: "CI", name: "Côte d'Ivoire", coords: [7.539, -5.5471] },
  { code: "CK", name: "Cook Islands", coords: [-21.2367, -159.7777] },
  { code: "CL", name: "Chile", coords: [-35.6751, -71.543] },
  { code: "CM", name: "Cameroon", coords: [7.3697, 12.3547] },
  { code: "CN", name: "China", coords: [35.8617, 104.1954] },
  { code: "CO", name: "Colombia", coords: [4.5709, -74.2973] },
  { code: "CR", name: "Costa Rica", coords: [9.7489, -83.7534] },
  { code: "CU", name: "Cuba", coords: [21.5218, -77.7812] },
  { code: "CV", name: "Cabo Verde", coords: [16.5388, -23.0418] },
  { code: "CW", name: "Curaçao", coords: [12.1696, -68.99] },
  { code: "CX", name: "Christmas Island", coords: [-10.4475, 105.6904] },
  { code: "CY", name: "Cyprus", coords: [35.1264, 33.4299] },
  { code: "CZ", name: "Czechia", coords: [49.8175, 15.4729] },
  { code: "DE", name: "Germany", coords: [51.1657, 10.4515] },
  { code: "DJ", name: "Djibouti", coords: [11.8251, 42.5903] },
  { code: "DK", name: "Denmark", coords: [56.2639, 9.5018] },
  { code: "DM", name: "Dominica", coords: [15.414999, -61.370976] },
  { code: "DO", name: "Dominican Republic", coords: [18.7357, -70.1627] },
  { code: "DZ", name: "Algeria", coords: [28.0339, 1.6596] },
  { code: "EC", name: "Ecuador", coords: [-1.8312, -78.1834] },
  { code: "EE", name: "Estonia", coords: [58.5953, 25.0136] },
  { code: "EG", name: "Egypt", coords: [26.8206, 30.8025] },
  { code: "EH", name: "Western Sahara", coords: [24.2155, -12.8858] },
  { code: "ER", name: "Eritrea", coords: [15.1794, 39.7823] },
  { code: "ES", name: "Spain", coords: [40.4637, -3.7492] },
  { code: "ET", name: "Ethiopia", coords: [9.145, 40.4897] },
  { code: "FI", name: "Finland", coords: [61.9241, 25.7482] },
  { code: "FJ", name: "Fiji", coords: [-17.7134, 178.065] },
  {
    code: "FK",
    name: "Falkland Islands (Malvinas)",
    coords: [-51.7963, -59.5236],
  },
  {
    code: "FM",
    name: "Micronesia, Federated States of",
    coords: [7.4256, 150.5508],
  },
  { code: "FO", name: "Faroe Islands", coords: [61.8926, -6.9118] },
  { code: "FR", name: "France", coords: [46.6034, 1.8883] },
  { code: "GA", name: "Gabon", coords: [-0.8037, 11.6094] },
  {
    code: "GB",
    name: "United Kingdom of Great Britain and Northern Ireland",
    coords: [55.3781, -3.436],
  },
  { code: "GD", name: "Grenada", coords: [12.1048, -61.6822] },
  { code: "GE", name: "Georgia", coords: [42.3154, 43.3569] },
  { code: "GF", name: "French Guiana", coords: [3.9339, -53.1258] },
  { code: "GG", name: "Guernsey", coords: [49.4657, -2.5853] },
  { code: "GH", name: "Ghana", coords: [7.9465, -1.0232] },
  { code: "GI", name: "Gibraltar", coords: [36.1408, -5.3536] },
  { code: "GL", name: "Greenland", coords: [71.7069, -42.6043] },
  { code: "GM", name: "Gambia", coords: [13.4432, -15.3101] },
  { code: "GN", name: "Guinea", coords: [9.9456, -9.6966] },
  { code: "GP", name: "Guadeloupe", coords: [16.995971, -62.067641] },
  { code: "GQ", name: "Equatorial Guinea", coords: [1.6508, 10.2679] },
  { code: "GR", name: "Greece", coords: [39.0742, 21.8243] },
  {
    code: "GS",
    name: "South Georgia and the South Sandwich Islands",
    coords: [-54.4296, -36.5879],
  },
  { code: "GT", name: "Guatemala", coords: [15.7835, -90.2308] },
  { code: "GU", name: "Guam", coords: [13.4443, 144.7937] },
  { code: "GW", name: "Guinea-Bissau", coords: [11.8037, -15.1804] },
  { code: "GY", name: "Guyana", coords: [4.860416, -58.93018] },
  { code: "HK", name: "Hong Kong", coords: [22.3964, 114.1095] },
  {
    code: "HM",
    name: "Heard Island and McDonald Islands",
    coords: [-53.0818, 73.5042],
  },
  { code: "HN", name: "Honduras", coords: [15.199998, -86.241905] },
  { code: "HR", name: "Croatia", coords: [45.1, 15.2] },
  { code: "HT", name: "Haiti", coords: [18.9712, -72.2852] },
  { code: "HU", name: "Hungary", coords: [47.1625, 19.5033] },
  { code: "ID", name: "Indonesia", coords: [-0.7893, 113.9213] },
  { code: "IE", name: "Ireland", coords: [53.1424, -7.6921] },
  { code: "IL", name: "Israel", coords: [31.046051, 34.851612] },
  { code: "IM", name: "Isle of Man", coords: [54.2361, -4.5481] },
  { code: "IN", name: "India", coords: [20.5937, 78.9629] },
  {
    code: "IO",
    name: "British Indian Ocean Territory",
    coords: [-6.3432, 71.8765],
  },
  { code: "IQ", name: "Iraq", coords: [33.223191, 43.679291] },
  { code: "IR", name: "Iran, Islamic Republic of", coords: [32.4279, 53.688] },
  { code: "IS", name: "Iceland", coords: [64.9631, -19.0208] },
  { code: "IT", name: "Italy", coords: [41.8719, 12.5674] },
  { code: "JE", name: "Jersey", coords: [49.2144, -2.1313] },
  { code: "JM", name: "Jamaica", coords: [18.1096, -77.2975] },
  { code: "JO", name: "Jordan", coords: [30.5852, 36.2384] },
  { code: "JP", name: "Japan", coords: [36.2048, 138.2529] },
  { code: "KE", name: "Kenya", coords: [-0.0236, 37.9062] },
  { code: "KG", name: "Kyrgyzstan", coords: [41.2044, 74.7661] },
  { code: "KH", name: "Cambodia", coords: [12.5657, 104.991] },
  { code: "KI", name: "Kiribati", coords: [-3.3704, -168.734] },
  { code: "KM", name: "Comoros", coords: [-11.6455, 43.3333] },
  {
    code: "KN",
    name: "Saint Kitts and Nevis",
    coords: [17.357822, -62.782998],
  },
  {
    code: "KP",
    name: "Korea, Democratic People's Republic of",
    coords: [40.3399, 127.5101],
  },
  { code: "KR", name: "Korea, Republic of", coords: [35.9078, 127.7669] },
  { code: "KW", name: "Kuwait", coords: [29.3759, 47.9774] },
  { code: "KY", name: "Cayman Islands", coords: [19.5135, -80.566] },
  { code: "KZ", name: "Kazakhstan", coords: [48.0196, 66.9237] },
  {
    code: "LA",
    name: "Lao People's Democratic Republic",
    coords: [19.8563, 102.4955],
  },
  { code: "LB", name: "Lebanon", coords: [33.8547, 35.8623] },
  { code: "LC", name: "Saint Lucia", coords: [13.9094, -60.9789] },
  { code: "LI", name: "Liechtenstein", coords: [47.166, 9.5554] },
  { code: "LK", name: "Sri Lanka", coords: [7.8731, 80.7718] },
  { code: "LR", name: "Liberia", coords: [6.4281, -9.4295] },
  { code: "LS", name: "Lesotho", coords: [-29.61, 28.2336] },
  { code: "LT", name: "Lithuania", coords: [55.1694, 23.8813] },
  { code: "LU", name: "Luxembourg", coords: [49.8153, 6.1296] },
  { code: "LV", name: "Latvia", coords: [56.8796, 24.6032] },
  { code: "LY", name: "Libya", coords: [26.3351, 17.2283] },
  { code: "MA", name: "Morocco", coords: [31.7917, -7.0926] },
  { code: "MC", name: "Monaco", coords: [43.7384, 7.4246] },
  { code: "MD", name: "Moldova, Republic of", coords: [47.4116, 28.3699] },
  { code: "ME", name: "Montenegro", coords: [42.7087, 19.3744] },
  {
    code: "MF",
    name: "Saint Martin (French part)",
    coords: [18.076002, -63.050071],
  },
  { code: "MG", name: "Madagascar", coords: [-18.7669, 46.8691] },
  { code: "MH", name: "Marshall Islands", coords: [7.1315, 171.1845] },
  {
    code: "MK",
    name: "Macedonia, the former Yugoslav Republic of",
    coords: [41.6086, 21.7453],
  },
  { code: "ML", name: "Mali", coords: [17.5707, -3.9962] },
  { code: "MM", name: "Myanmar", coords: [21.9162, 95.956] },
  { code: "MN", name: "Mongolia", coords: [46.8625, 103.8467] },
  { code: "MO", name: "Macao", coords: [22.1987, 113.5439] },
  { code: "MP", name: "Northern Mariana Islands", coords: [17.3308, 145.3847] },
  { code: "MQ", name: "Martinique", coords: [14.6415, -61.0242] },
  { code: "MR", name: "Mauritania", coords: [21.0079, -10.9408] },
  { code: "MS", name: "Montserrat", coords: [16.742498, -62.187366] },
  { code: "MT", name: "Malta", coords: [35.9375, 14.3754] },
  { code: "MU", name: "Mauritius", coords: [-20.3484, 57.5522] },
  { code: "MV", name: "Maldives", coords: [3.2028, 73.2207] },
  { code: "MW", name: "Malawi", coords: [-13.2543, 34.3015] },
  { code: "MX", name: "Mexico", coords: [23.6345, -102.5528] },
  { code: "MY", name: "Malaysia", coords: [4.2105, 101.9758] },
  { code: "MZ", name: "Mozambique", coords: [-18.665695, 35.529562] },
  { code: "NA", name: "Namibia", coords: [-22.9576, 18.4904] },
  { code: "NC", name: "New Caledonia", coords: [-20.9043, 165.618] },
  { code: "NE", name: "Niger", coords: [17.6078, 8.0817] },
  { code: "NF", name: "Norfolk Island", coords: [-29.0408, 167.9547] },
  { code: "NG", name: "Nigeria", coords: [9.082, 8.6753] },
  { code: "NI", name: "Nicaragua", coords: [12.865416, -85.207229] },
  { code: "NL", name: "Netherlands", coords: [52.1326, 5.2913] },
  { code: "NO", name: "Norway", coords: [60.472, 8.4689] },
  { code: "NP", name: "Nepal", coords: [28.3949, 84.124] },
  { code: "NR", name: "Nauru", coords: [-0.522778, 166.931503] },
  { code: "NU", name: "Niue", coords: [-19.0544, -169.8672] },
  { code: "NZ", name: "New Zealand", coords: [-40.9006, 174.886] },
  { code: "OM", name: "Oman", coords: [21.4735, 55.9754] },
  { code: "PA", name: "Panama", coords: [8.538, -80.7821] },
  { code: "PE", name: "Peru", coords: [-9.1902, -75.0152] },
  { code: "PF", name: "French Polynesia", coords: [-17.6797, -149.4068] },
  { code: "PG", name: "Papua New Guinea", coords: [-6.314993, 143.95555] },
  { code: "PH", name: "Philippines", coords: [12.8797, 121.774] },
  { code: "PK", name: "Pakistan", coords: [30.3753, 69.3451] },
  { code: "PL", name: "Poland", coords: [51.9194, 19.1451] },
  {
    code: "PM",
    name: "Saint Pierre and Miquelon",
    coords: [46.941936, -56.27111],
  },
  { code: "PN", name: "Pitcairn", coords: [-24.3766, -128.324] },
  { code: "PR", name: "Puerto Rico", coords: [18.2208, -66.5901] },
  { code: "PT", name: "Portugal", coords: [39.3999, -8.2245] },
  { code: "PW", name: "Palau", coords: [7.515, 134.5825] },
  { code: "PY", name: "Paraguay", coords: [-23.4425, -58.4438] },
  { code: "QA", name: "Qatar", coords: [25.3548, 51.1839] },
  { code: "RE", name: "Réunion", coords: [-21.1151, 55.5364] },
  { code: "RO", name: "Romania", coords: [45.9432, 24.9668] },
  { code: "RS", name: "Serbia", coords: [44.0165, 21.0059] },
  { code: "RU", name: "Russian Federation", coords: [61.524, 105.3188] },
  { code: "RW", name: "Rwanda", coords: [-1.9403, 29.8739] },
  { code: "SA", name: "Saudi Arabia", coords: [23.8859, 45.0792] },
  { code: "SB", name: "Solomon Islands", coords: [-9.6457, 160.1562] },
  { code: "SC", name: "Seychelles", coords: [-4.6796, 55.4919] },
  { code: "SD", name: "Sudan", coords: [12.8628, 30.2176] },
  { code: "SE", name: "Sweden", coords: [60.1282, 18.6435] },
  { code: "SG", name: "Singapore", coords: [1.3521, 103.8198] },
  {
    code: "SH",
    name: "Saint Helena, Ascension and Tristan da Cunha",
    coords: [-24.1435, -10.0307],
  },
  { code: "SI", name: "Slovenia", coords: [46.1512, 14.9955] },
  { code: "SJ", name: "Svalbard and Jan Mayen", coords: [77.5536, 23.6703] },
  { code: "SK", name: "Slovakia", coords: [48.669, 19.699] },
  { code: "SL", name: "Sierra Leone", coords: [8.460555, -11.779889] },
  { code: "SM", name: "San Marino", coords: [43.9424, 12.4578] },
  { code: "SN", name: "Senegal", coords: [14.4974, -14.4524] },
  { code: "SO", name: "Somalia", coords: [5.1521, 46.1996] },
  { code: "SR", name: "Suriname", coords: [3.9193, -56.0278] },
  { code: "SS", name: "South Sudan", coords: [6.8769, 31.3069] },
  { code: "ST", name: "Sao Tome and Principe", coords: [0.1864, 6.6131] },
  { code: "SV", name: "El Salvador", coords: [13.7942, -88.8965] },
  {
    code: "SX",
    name: "Sint Maarten (Dutch part)",
    coords: [18.0425, -63.0548],
  },
  { code: "SY", name: "Syrian Arab Republic", coords: [34.8021, 38.9968] },
  { code: "SZ", name: "Eswatini", coords: [-26.5225, 31.4659] },
  { code: "TC", name: "Turks and Caicos Islands", coords: [21.694, -71.7979] },
  { code: "TD", name: "Chad", coords: [15.4542, 18.7322] },
  {
    code: "TF",
    name: "French Southern Territories",
    coords: [-49.2804, 69.3486],
  },
  { code: "TG", name: "Togo", coords: [8.6195, 0.8248] },
  { code: "TH", name: "Thailand", coords: [15.870032, 100.992541] },
  { code: "TJ", name: "Tajikistan", coords: [38.861, 71.2761] },
  { code: "TK", name: "Tokelau", coords: [-8.9674, -171.8559] },
  { code: "TL", name: "Timor-Leste", coords: [-8.8742, 125.7275] },
  { code: "TM", name: "Turkmenistan", coords: [38.9697, 59.5563] },
  { code: "TN", name: "Tunisia", coords: [33.8869, 9.5375] },
  { code: "TO", name: "Tonga", coords: [-21.178986, -175.198242] },
  { code: "TR", name: "Turkey", coords: [38.9637, 35.2433] },
  { code: "TT", name: "Trinidad and Tobago", coords: [10.6918, -61.2225] },
  { code: "TV", name: "Tuvalu", coords: [-7.1095, 177.6493] },
  {
    code: "TW",
    name: "Taiwan, Province of China",
    coords: [23.6978, 120.9605],
  },
  {
    code: "TZ",
    name: "Tanzania, United Republic of",
    coords: [-6.369028, 34.888822],
  },
  { code: "UA", name: "Ukraine", coords: [48.3794, 31.1656] },
  { code: "UG", name: "Uganda", coords: [1.3733, 32.2903] },
  {
    code: "UM",
    name: "United States Minor Outlying Islands",
    coords: [19.2823, 166.647],
  },
  { code: "US", name: "United States of America", coords: [37.0902, -95.7129] },
  { code: "UY", name: "Uruguay", coords: [-32.5228, -55.7658] },
  { code: "UZ", name: "Uzbekistan", coords: [41.3775, 64.5853] },
  { code: "VA", name: "Holy See", coords: [41.9029, 12.4534] },
  {
    code: "VC",
    name: "Saint Vincent and the Grenadines",
    coords: [12.9843, -61.2872],
  },
  { code: "VE", name: "Venezuela", coords: [6.4238, -66.5897] },
  { code: "VG", name: "Virgin Islands (British)", coords: [18.4207, -64.64] },
  { code: "VI", name: "Virgin Islands (U.S.)", coords: [18.3358, -64.8963] },
  { code: "VN", name: "Viet Nam", coords: [14.0583, 108.2772] },
  { code: "VU", name: "Vanuatu", coords: [-15.3767, 166.9592] },
  { code: "WF", name: "Wallis and Futuna", coords: [-13.768752, -177.156097] },
  { code: "WS", name: "Samoa", coords: [-13.759, -172.1046] },
  { code: "YE", name: "Yemen", coords: [15.5527, 48.5164] },
  { code: "YT", name: "Mayotte", coords: [-12.8275, 45.166244] },
  { code: "ZA", name: "South Africa", coords: [-30.5595, 22.9375] },
  { code: "ZM", name: "Zambia", coords: [-13.133897, 27.849332] },
  { code: "ZW", name: "Zimbabwe", coords: [-19.015438, 29.154857] },
];

const languages = [
  { code: "", name: "All languages" },
  { code: "english", name: "English" },
  { code: "german", name: "German" },
  { code: "spanish", name: "Spanish" },
  { code: "french", name: "French" },
  { code: "chinese", name: "Chinese" },
  { code: "italian", name: "Italian" },
  { code: "greek", name: "Greek" },
  { code: "russian", name: "Russian" },
  { code: "polish", name: "Polish" },
  { code: "portuguese", name: "Portuguese" },
  { code: "dutch", name: "Dutch" },
  { code: "tamil", name: "Tamil" },
  { code: "hindi", name: "Hindi" },
  { code: "brazilian portuguese", name: "Brazilian Portuguese" },
  { code: "romanian", name: "Romanian" },
  { code: "arabic", name: "Arabic" },
  { code: "american english", name: "American English" },
  { code: "serbian", name: "Serbian" },
  { code: "hungarian", name: "Hungarian" },
  { code: "ukrainian", name: "Ukrainian" },
  { code: "malayalam", name: "Malayalam" },
  { code: "czech", name: "Czech" },
  { code: "turkish", name: "Turkish" },
  { code: "croatian", name: "Croatian" },
  { code: "japanese", name: "Japanese" },
  { code: "luganda", name: "Luganda" },
  { code: "filipino", name: "Filipino" },
  { code: "swedish", name: "Swedish" },
  { code: "slovak", name: "Slovak" },
  { code: "indonesian", name: "Indonesian" },
  { code: "english uk", name: "English UK" },
  { code: "catalan", name: "Catalan" },
  { code: "español internacional", name: "Español Internacional" },
  { code: "bosnian", name: "Bosnian" },
  { code: "bahasa indonesia", name: "Bahasa Indonesia" },
  { code: "язык: русский", name: "Язык: Русский" },
  { code: "português brasil", name: "Português Brasil" },
  { code: "danish", name: "Danish" },
  { code: "español argentina", name: "Español Argentina" },
  { code: "punjabi", name: "Punjabi" },
  { code: "bulgarian", name: "Bulgarian" },
  { code: "norwegian", name: "Norwegian" },
  { code: "espanish", name: "Espanish" },
  { code: "cantonese", name: "Cantonese" },
  { code: "british english", name: "British English" },
  { code: "finnish", name: "Finnish" },
  { code: "korean", name: "Korean" },
  { code: "slovenian", name: "Slovenian" },
  { code: "deutsch fränkisch", name: "Deutsch Fränkisch" },
  { code: "thai", name: "Thai" },
  { code: "portugues do brasil", name: "Portugues do Brasil" },
  { code: "português (brasil)", name: "Português (Brasil)" },
  { code: "castellano. español", name: "Castellano. Español" },
  { code: "engilsh", name: "Engilsh" },
  { code: "kannada", name: "Kannada" },
  { code: "persian", name: "Persian" },
  { code: "swiss german", name: "Swiss German" },
  { code: "hebrew", name: "Hebrew" },
  { code: "urdu", name: "Urdu" },
  { code: "estonian", name: "Estonian" },
  { code: "malay", name: "Malay" },
  { code: "swahili", name: "Swahili" },
  { code: "lithuanian", name: "Lithuanian" },
  { code: "latvian", name: "Latvian" },
  { code: "kazakh", name: "Kazakh" },
  { code: "sinhala", name: "Sinhala" },
  { code: "espaňol", name: "Espaňol" },
  { code: "português (br)", name: "Português (BR)" },
  { code: "mandarin", name: "Mandarin" },
  { code: "kurdish", name: "Kurdish" },
  { code: "deu", name: "Deu" },
  { code: "macedonian", name: "Macedonian" },
  { code: "vietnamese", name: "Vietnamese" },
  { code: "georgian", name: "Georgian" },
  { code: "montenegro", name: "Montenegro" },
  { code: "tagalog", name: "Tagalog" },
  { code: "english/", name: "English/" },
  { code: "belarusian", name: "Belarusian" },
  { code: "nepali", name: "Nepali" },
  { code: "amharic", name: "Amharic" },
  { code: "azerbaijani", name: "Azerbaijani" },
  { code: "bangla", name: "Bangla" },
  { code: "telugu", name: "Telugu" },
  { code: "español mexico", name: "Español Mexico" },
  { code: "العربية", name: "العربية" },
  { code: "afrikaans", name: "Afrikaans" },
  { code: "english/russian", name: "English/Russian" },
  { code: "español colombia", name: "Español Colombia" },
  { code: "lusoga", name: "Lusoga" },
  { code: "bengali", name: "Bengali" },
  { code: "albanian", name: "Albanian" },
  { code: "galician", name: "Galician" },
  { code: "español - latinoamerica", name: "Español - Latinoamerica" },
  { code: "lunyankole", name: "Lunyankole" },
  { code: "luganda english", name: "Luganda English" },
  { code: "brasil", name: "Brasil" },
  { code: "español chile", name: "Español Chile" },
  { code: "montenegrin", name: "Montenegrin" },
  { code: "icelandic", name: "Icelandic" },
  { code: "odia", name: "Odia" },
];

const tags = [
  { code: "", name: "All categories" },
  { code: "pop", name: "Pop" },
  { code: "music", name: "Music" },
  { code: "news", name: "News" },
  { code: "rock", name: "Rock" },
  { code: "classical", name: "Classical" },
  { code: "talk", name: "Talk" },
  { code: "radio", name: "Radio" },
  { code: "hits", name: "Hits" },
  { code: "estación", name: "Estación" },
  { code: "entretenimiento", name: "Entretenimiento" },
  { code: "dance", name: "Dance" },
  { code: "oldies", name: "Oldies" },
  { code: "méxico", name: "México" },
  { code: "public radio", name: "Public Radio" },
  { code: "80s", name: "80s" },
  { code: "fm", name: "FM" },
  { code: "christian", name: "Christian" },
  { code: "jazz", name: "Jazz" },
  { code: "música", name: "Música" },
  { code: "classic hits", name: "Classic Hits" },
  { code: "pop music", name: "Pop Music" },
  { code: "90s", name: "90s" },
  { code: "top 40", name: "Top 40" },
  { code: "electronic", name: "Electronic" },
  { code: "moi merino", name: "Moi Merino" },
  { code: "classic rock", name: "Classic Rock" },
  { code: "community radio", name: "Community Radio" },
  { code: "adult contemporary", name: "Adult Contemporary" },
  { code: "norteamérica", name: "Norteamérica" },
  { code: "latinoamérica", name: "Latinoamérica" },
  { code: "español", name: "Español" },
  { code: "country", name: "Country" },
  { code: "local news", name: "Local News" },
  { code: "música en español", name: "Música en Español" },
  { code: "house", name: "House" },
  { code: "folk", name: "Folk" },
  { code: "alternative", name: "Alternative" },
  { code: "pop rock", name: "Pop Rock" },
  { code: "70s", name: "70s" },
  { code: "mex", name: "Mex" },
  { code: "música pop", name: "Música Pop" },
  { code: "mx", name: "MX" },
  { code: "musica", name: "Musica" },
  { code: "mexico", name: "Mexico" },
  { code: "information", name: "Information" },
  { code: "variety", name: "Variety" },
  { code: "regional mexican", name: "Regional Mexican" },
  { code: "regional", name: "Regional" },
  { code: "indie", name: "Indie" },
  { code: "noticias", name: "Noticias" },
  { code: "américa", name: "América" },
  { code: "greek", name: "Greek" },
  { code: "chillout", name: "Chillout" },
  { code: "soul", name: "Soul" },
  { code: "news talk", name: "News Talk" },
  { code: "misc", name: "Misc" },
  { code: "música regional", name: "Música Regional" },
  { code: "música popular mexicana", name: "Música Popular Mexicana" },
  { code: "top40", name: "Top40" },
  { code: "regional mexicana", name: "Regional Mexicana" },
  { code: "regional radio", name: "Regional Radio" },
  { code: "gospel", name: "Gospel" },
  { code: "metal", name: "Metal" },
  { code: "religious", name: "Religious" },
  { code: "grupera", name: "Grupera" },
  { code: "sports", name: "Sports" },
  { code: "hiphop", name: "Hiphop" },
  { code: "radio hablada", name: "Radio Hablada" },
  { code: "rap", name: "Rap" },
  { code: "npr", name: "NPR" },
  { code: "techno", name: "Techno" },
  { code: "música variada", name: "Música Variada" },
  { code: "local radio", name: "Local Radio" },
  { code: "juvenil", name: "Juvenil" },
  { code: "alternative rock", name: "Alternative Rock" },
  { code: "entertainment", name: "Entertainment" },
  { code: "ambient", name: "Ambient" },
  { code: "easy listening", name: "Easy Listening" },
  { code: "mexican music", name: "Mexican Music" },
  { code: "lounge", name: "Lounge" },
  { code: "culture", name: "Culture" },
  { code: "blues", name: "Blues" },
  { code: "funk", name: "Funk" },
  { code: "talk & speech", name: "Talk & Speech" },
  { code: "disco", name: "Disco" },
  { code: "university radio", name: "University Radio" },
  { code: "traditional mexican music", name: "Traditional Mexican Music" },
  { code: "latin pop", name: "Latin Pop" },
  { code: "mainstream", name: "Mainstream" },
  { code: "electro", name: "Electro" },
  { code: "retro", name: "Retro" },
  { code: "world music", name: "World Music" },
  { code: "música del recuerdo", name: "Música del Recuerdo" },
  { code: "60s", name: "60s" },
  { code: "top hits", name: "Top Hits" },
  { code: "trance", name: "Trance" },
  { code: "edm", name: "EDM" },
  { code: "grupero", name: "Grupero" },
  { code: "local music", name: "Local Music" },
  { code: "smooth jazz", name: "Smooth Jazz" },
];

export { countries, languages, tags };
