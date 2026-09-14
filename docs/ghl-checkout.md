# Checkout: Thrivecart → GoHighLevel

The client is moving ticket checkout off Thrivecart and onto **GoHighLevel** (GHL).
This document records why, what exists in the GHL account today, and exactly what
is left to do. It is the reference for whoever finishes the migration.

No credentials live in this file or anywhere else in this repository. Logins are in
the ClickUp task; discount codes are covered under "Coupons" below.

## Why

Bridget Newsome (ShuBu), on [ClickUp 869eu5rhz](https://app.clickup.com/t/869eu5rhz), 10 Sept 2026:

> We will need to build the checkout pages in GHL instead of Thrivecart, because GHL
> is what allows the client to automate things and keep track of who registers /
> their tags / etc.

Thrivecart takes the money but leaves no contact record in the client's CRM. GHL
puts the buyer into Contacts on purchase, which is what makes tagging, the
registrant list, and the reminder sequence possible. That automation — not the
checkout itself — is the point of the move.

The client's own walkthrough (Loom, "GHL Setup Overview for Retreat Payments") sets
the pattern:

> We will have to first create products, so one will be the early bird ticket and
> one will be the regular price ticket. […] And once the products are created, we
> can kind of nest those inside of the actual landing page where we're going to
> collect payments.

Their existing **Sedona CEO Retreat Sales** funnel is the working model: a landing
page, one funnel step per purchasable thing, and a thank-you step.

## The account

Sub-account **Chef Deb LLC** (Fort Worth, Texas), location `V9PNopMfApBtTN23mTfR`.

| | |
|---|---|
| Payment provider | **Stripe — connected.** Nothing is blocked on payments setup. |
| Funnel domain | **`c.chefdeb.com` — already live.** Checkout needs no new DNS record. |
| Funnel folder | `Workshop` — `X8Gbc0fPoeBVvzQyB2KE` |
| Model funnel | `Sedona CEO Retreat Sales` — `gLWqjdOa2koWaPcci1Fc`, published at `c.chefdeb.com/landing-page` and `c.chefdeb.com/workshop-attendee` |

The `Workshop` folder already contains `Freedom by Design`, `SCALE Culinary
Association` and `SHARPEN Wait List`. The wait-list funnel is a different thing from
this checkout and was left untouched.

## What exists now

**Products** (Payments → Products). Created 11 Sept 2026, one-time, USD, matching
the two tiers the page sells:

| Product | Price | ID |
|---|---|---|
| SHARPEN 2027 Early Bird Ticket | $395 | `6aa401d4da430b73790bf564` |
| SHARPEN 2027 Regular Ticket | $495 | `6aa402376c4d00c40d64c4e6` |
| SHARPEN 2027 Bring a Colleague (2 seats) | $592.50 | `6aa41b58c06be4cc653e2e11` |

Two separate products rather than one product with two prices, because that is what
the client asked for in the Loom and it matches how the rest of their catalogue is
built (`Workshop Attendee`, `Workshop VIP`, `Workshop Regular`).

**Funnel pages** — `SHARPEN 2027 Registration` (`RMI6MUJA4vmv5S5fIUVF`, in the
`Workshop` folder), published on `c.chefdeb.com`. **This is what the site now uses.**
One step per purchasable thing, each with its product attached; all three were
confirmed to return HTTP 200 publicly with the right product name and price:

| Tier | Price | URL |
|---|---|---|
| Early Bird | $395 | `https://c.chefdeb.com/sharpen-2027-early-bird` |
| Regular | $495 | `https://c.chefdeb.com/sharpen-2027-regular` |
| Bring a Colleague (2 seats) | $592.50 | `https://c.chefdeb.com/sharpen-2027-bring-a-colleague` |

These replaced the interim payment links on `link.fastpaydirect.com`, which the site
used from 11 Sept 2026 and which are recorded here only so an old link found
elsewhere can be recognised: Early Bird `6aa40b69e9a073174b3b5cbc`, Regular
`6aa40cbce9a073174b3b5cbf`, Bring a Colleague `6aa41bd8ceb12d9fc1a8c588`. Payment
links were chosen originally because they needed no page building and lost none of
the automation — the **Order Submitted** trigger fires for both. What the funnel
pages add is the client's own domain and branding on a $395 purchase, which is why
the client asked for them ("Please add the funnel page, the client wants that",
ClickUp, Sept 2026).

The automation attaches to the order, not to the page, so moving from links to pages
changes nothing about contacts, tags or workflows.

## What is left

Nothing blocks taking money. These are in rough priority order.

1. **Confirm the payment mode is Live, not Test.** The three funnel pages are
   published and carry no test-mode banner, and each shows the right product and
   price — but the Live/Test toggle on the order-form element was not provable from
   outside, and it is money. Eyeball it in the builder.
2. **Close the Early Bird page on 30 Nov 2026.** Unpublish the step, or point it at
   the Regular page. Without that, it keeps selling a $495 seat for $395 from 1 Dec
   onward. The static CTAs are baked at build time and cannot flip themselves, so
   this is the only thing that makes the deadline real. Fail closed.
3. **Build the automation** — the reason for the whole move. Bridget, ClickUp
   Sept 2026: "no need to build tags, the client will do that", so the tagging
   below is the client's job; the rest is still open:
   - tag on purchase — `sharpen-2027-registered`, plus `early-bird` / `regular`
   - confirmation email carrying the real terms: both days, **lunch daily,
     breakfast not provided**, non-refundable, agenda PDF, hotel note
   - an opportunity in a SHARPEN 2027 pipeline so Bianca can watch the 50 seats
   - reminder sequence toward 28 Jan 2027
   - a separate RSVP form for the welcome dinner and Mastermind Day, which are *not*
     included in the ticket and must not be sold as if they were

   None of this has to exist before the first sale. Purchases create the contact and
   the order record regardless, and earlier buyers can be bulk-tagged from the Orders
   list, so nothing is lost by adding workflows later.

4. **A Thank You step.** The funnel has three checkout steps and no post-purchase
   page, so a buyer's last screen is whatever GHL shows by default. Add one that
   confirms the real terms — both days, lunch daily, breakfast not provided,
   non-refundable — and links the agenda PDF.

5. **One page that offers whichever tier is open, before 1 Dec.** Three separate
   pages still cannot express "the tier that is currently open" to a static CTA, so
   `links.checkout` has to be swapped by hand at the switchover. A single checkout
   page that serves the open tier removes that hand-edit, and is what the client
   described in their Loom. Lower priority now that the pages are branded and live;
   item 2 is what actually protects the money.

## Coupons — settled, and there are none

`BAC` was advertised as a code the buyer typed for "second ticket half off". The
client settled this on 11 Sept 2026 in favour of a **two-seat product** at $592.50
($395 + half of $395), and the code is gone from the site.

The reason is arithmetic rather than taste. GoHighLevel coupons discount the whole
order, so a 50% code on a two-seat order would have halved *both* tickets — $395
instead of $592.50, costing $197.50 every time it was used. A fixed-amount code
priced for two seats would have applied to one-seat orders too. A product priced at
exactly $592.50 states the offer and cannot be misapplied.

On the page this became a second button on the Early Bird card — one seat or two,
chosen at the point of buying — plus a button in the Bring a Colleague section.

**There is no coupon anywhere in this account for SHARPEN, and no discount code on
the site.** Coupon fields are being switched off across the products. If a code is
ever reintroduced, check first how the platform actually applies it to a multi-seat
order.

The client's internal comp and scholarship codes stay in ClickUp and must never
appear in this repository or in the build.

### Still open: the two-seat option after 1 December

The $592.50 product is priced off Early Bird. When Regular opens on 1 Dec the
equivalent would be $742.50 ($495 + half of $495), and no such product exists. Either
create one at that point or accept that Bring a Colleague is an Early Bird offer
only — worth deciding before the switchover rather than after.

## Existing Thrivecart registrants

Anyone who has already bought through Thrivecart exists in Stripe but not
necessarily in GHL Contacts. Before the reminder sequence goes out, confirm whether
Thrivecart and GHL are on the same Stripe account, and import past buyers with the
`sharpen-2027-registered` tag — otherwise they are invisible to every workflow built
in step 3 and the seat count will be wrong.
