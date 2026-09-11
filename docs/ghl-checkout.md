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

Two separate products rather than one product with two prices, because that is what
the client asked for in the Loom and it matches how the rest of their catalogue is
built (`Workshop Attendee`, `Workshop VIP`, `Workshop Regular`).

**Funnel** `SHARPEN 2027 Registration` — `RMI6MUJA4vmv5S5fIUVF`, in the `Workshop`
folder, with one step:

- `Checkout` — `c040e072-27f6-47e3-b79a-c58b1a332b3e`, path `sharpen-2027-checkout`

The step is a **blank page with no domain attached, so it is not live** and nothing
links to it. It reserves the name and the path; it still needs its order form.

## What is left

1. **Design the Checkout page.** Open the step and either import the design from
   `Sedona CEO Retreat Sales → Workshop Attendee` (Use existing → Funnel) or drop a
   1-Step Order element onto a blank page. Importing does *not* carry products
   across — they are attached separately, on the step's Products tab.
2. **Attach both products** to the step (Products tab → Add Product).
3. **Add a Thank You step** and point the order form's post-purchase redirect at it.
   Suggested path `sharpen-2027-thank-you`, mirroring the Sedona funnel.
4. **Attach the domain** `c.chefdeb.com` in the funnel's Settings, then publish. The
   checkout then lives at `https://c.chefdeb.com/sharpen-2027-checkout`.
5. **Flip the URL in this repo** — one line, `links.checkout` in
   [`src/data/site.ts`](../src/data/site.ts). Every CTA follows it.
6. **Build the automation**, which is the reason for the whole move:
   - tag on purchase — `sharpen-2027-registered`, plus `early-bird` / `regular`
   - confirmation email carrying the real terms: both days, **lunch daily,
     breakfast not provided**, non-refundable, agenda PDF, hotel note
   - an opportunity in a SHARPEN 2027 pipeline so Bianca can watch the 50 seats
   - reminder sequence toward 28 Jan 2027
   - a separate RSVP form for the welcome dinner and Mastermind Day, which are *not*
     included in the ticket and must not be sold as if they were

Steps 1–4 need GHL's visual builder and its product pickers, which are drag-and-drop
Vue components. They are a hands-on job in the browser, not something that can be
scripted.

## Coupons — `BAC` needs a decision before it is built

The page advertises `BAC` — "second ticket half off" — as a code the buyer types.
GHL coupons are **percentage or fixed amount off the whole order**, so there is no
direct way to express "half off the second one":

- A **50% coupon** on a two-seat order discounts *both* tickets — $395 instead of
  the intended $592.50. It loses the client $197.50 every time it is used.
- A **fixed $197.50 coupon** gives the right answer on a two-seat order, but also
  applies to a one-seat order unless a minimum can be enforced.

The clean alternative is a **third product** — `SHARPEN 2027 Bring a Colleague (2
seats)` at **$592.50** — which cannot be misapplied and is self-documenting. That
changes `BAC` from a code into a ticket option, which is a content change to the
page and therefore the client's call.

**No coupon has been created.** Creating a wrong one costs real money on every
order, so this is deliberately left for the client to settle.

The client's internal comp and scholarship codes stay in ClickUp. They must never
appear in this repository or in the build. `BAC` remains the only public code.

## Existing Thrivecart registrants

Anyone who has already bought through Thrivecart exists in Stripe but not
necessarily in GHL Contacts. Before the reminder sequence goes out, confirm whether
Thrivecart and GHL are on the same Stripe account, and import past buyers with the
`sharpen-2027-registered` tag — otherwise they are invisible to every workflow built
in step 6 and the seat count will be wrong.
