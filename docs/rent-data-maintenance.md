# Rent Data Maintenance

Update cadence: monthly while the product is actively being tested, then quarterly once prices stabilise.

Source order:

1. ONS Private Rental Market Statistics for borough-level baseline checks.
2. Visible listing samples from Rightmove, Zoopla, OpenRent, and SpareRoom.
3. Manual neighbourhood review for local premium or discount against the borough baseline.

Files to update:

- `lib/data/neighbourhoods.ts`: one-bed and two-bed estimates per neighbourhood.
- `lib/data/rent-market.ts`: room-region averages, area overrides, and review date.
- `lib/rent.ts`: formula only; avoid editing this unless the rent model itself changes.

Review rules:

- Keep all values monthly and exclusive of bills.
- Round room and flat estimates to the nearest GBP 25.
- Treat flat-share upper-end as the comfortable room budget for a young professional.
- Treat house-share lower-end as the cheaper realistic room budget, not the cheapest possible listing.
- Record obvious local exceptions in `ROOM_AREA_OVERRIDES_GBP` rather than bending the formula.
