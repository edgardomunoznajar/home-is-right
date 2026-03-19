# Google Ads Campaign — Home Is a Right

## Campaign Settings

- **Campaign type:** Search
- **Daily budget:** $7 AUD
- **Location:** Australia
- **Language:** English
- **Bidding:** Maximize clicks (switch to Maximize conversions after 30 conversions)
- **Networks:** Google Search only (uncheck Display Network)

---

## Ad Group 1: Housing Crisis (broad awareness)

### Keywords
```
housing crisis australia
australian housing crisis
cost of living crisis australia
housing affordability australia
housing affordability crisis
can i afford a house
will i ever afford a house
house prices too high
```

### Ad

**Headlines (max 30 chars each — pick 3):**
1. `A 13-Year-Old Did the Maths`
2. `Housing Crisis in Numbers`
3. `$5.5M by 2053. That's Avg.`
4. `We Can't Afford Our Future`
5. `The Maths Is Broken`

**Descriptions (max 90 chars each — pick 2):**
1. `An Adelaide house will cost $5.5 million by 2053. Wages won't keep up. See the data.`
2. `House prices grow 6.8%/yr. Wages grow 3%. The gap gets wider every year. See the maths.`

**Final URL:** `https://righttohousing.au`

---

## Ad Group 2: Adelaide Specific

### Keywords
```
adelaide house prices
cost of living adelaide
adelaide housing market
adelaide property prices
buying a house in adelaide
adelaide median house price
can i afford a house adelaide
```

### Ad

**Headlines:**
1. `Adelaide Houses: $940K Today`
2. `$5.5M by the Time You're 40`
3. `Adelaide Housing in Numbers`
4. `See the Maths on Adelaide`
5. `The Price Runs Faster`

**Descriptions:**
1. `Adelaide median is $940K. At 6.8% growth, it's $5.5M in 27 years. A kid did the maths.`
2. `Your parents saved a deposit in 4 years. Yours takes 20. Same city. See what changed.`

**Final URL:** `https://righttohousing.au#the-maths`

---

## Ad Group 3: Renting / Youth

### Keywords
```
rent too expensive australia
rental crisis australia
affordable rentals australia
youth allowance rent
can't afford rent
rental affordability
renting vs buying australia
```

### Ad

**Headlines:**
1. `Zero Affordable Rentals`
2. `51,238 Listings. Zero Work.`
3. `Rent on Youth Allowance?`
4. `The Rental Maths Is Broken`
5. `Not Low. Not Few. Zero.`

**Descriptions:**
1. `51,238 rental listings surveyed. Affordable on Youth Allowance: zero. See the full data.`
2. `Zero affordable rentals out of 51,238 listings. Not a shortage — a system. See the maths.`

**Final URL:** `https://righttohousing.au#barriers`

---

## Ad Group 4: Petition / Action

### Keywords
```
right to housing australia
human rights act australia
housing human right
sign housing petition
housing petition australia
negative gearing reform
```

### Ad

**Headlines:**
1. `Housing Is a Human Right`
2. `The UN Gave Australia 24 Mo`
3. `Sign the Petition Today`
4. `135 MPs Own 2+ Properties`
5. `They Vote on Your Rent`

**Descriptions:**
1. `The UN told Australia to act on housing. 135 of 226 MPs own 2+ properties. Add your name.`
2. `Australia is the only liberal democracy without a Human Rights Act. Sign to change that.`

**Final URL:** `https://righttohousing.au#the-ask`

---

## Negative Keywords (add these to block wasted spend)
```
-buy house
-real estate agent
-property for sale
-home loan calculator
-mortgage broker
-investment property
-house and land package
-real estate listings
-domain
-realestate.com
```

These block people actually trying to buy/sell property — they're not your audience.

---

## Setup Checklist

1. [ ] Create Google Ads account at ads.google.com
2. [ ] Click "Switch to Expert Mode" (don't use Smart Campaign)
3. [ ] Create Search campaign, $7/day, Australia only
4. [ ] Add all 4 ad groups with keywords and ads above
5. [ ] Add negative keywords at campaign level
6. [ ] Set up conversion tracking:
   - Go to Tools → Conversions → New conversion action
   - Create "Petition Click" (primary), "Share" (secondary), "Story Submit" (secondary)
   - Copy your Conversion ID (AW-XXXXXXXXXX format)
   - Replace placeholders in site/index.html and site/js/main.js
7. [ ] Add sitelink extensions:
   - "See the Maths" → righttohousing.au#the-maths
   - "Sign the Petition" → righttohousing.au#the-ask
   - "Who Decides" → righttohousing.au#who-decides
8. [ ] Set ad schedule: 6am-11pm ACST (don't pay for 3am clicks)
9. [ ] Launch and check back after 48 hours
