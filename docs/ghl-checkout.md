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

**Payment Links** (Payments → Payment Links). **This is what the site now uses.**
Both are Active, both allow coupon codes, and both were confirmed to return HTTP 200
publicly with the right product and price:

| Tier | Price | URL |
|---|---|---|
| Early Bird | $395 | `https://link.fastpaydirect.com/payment-link/6aa40b69e9a073174b3b5cbc` |
| Regular | $495 | `https://link.fastpaydirect.com/payment-link/6aa40cbce9a073174b3b5cbf` |

A payment link was chosen over a funnel page because it needs no page building and
loses none of the automation — GoHighLevel's **Order Submitted** workflow trigger is
enabled for payment links, so the contact, the order record, tags and workflows all
behave exactly as they would on a funnel order form. The automation attaches to the
order, not to the page.

**Funnel** `SHARPEN 2027 Registration` — `RMI6MUJA4vmv5S5fIUVF`, in the `Workshop`
folder, with one step:

- `Checkout` — `c040e072-27f6-47e3-b79a-c58b1a332b3e`, path `sharpen-2027-checkout`

The step is a **blank page with no domain attached, so it is not live** and nothing
links to it. It is the scaffold for the branded checkout page described below.

## What is left

Nothing blocks taking money. These are in rough priority order.

1. **Confirm the payment mode is Live, not Test.** The toggle in each payment link
   reads as active, which should mean Live, and the public pages carry no test-mode
   banner — but this was not provable from outside, and it is money. Eyeball it.
2. **Set Automatic Deactivation on the Early Bird link** for 30 Nov 2026. Without
   it, that link keeps selling a $495 seat for $395 from 1 Dec onward. The static
   CTAs are baked at build time and cannot flip themselves, so this is the only
   thing that makes the deadline real. Fail closed.
3. **Decide the `BAC` coupon** — see below. The page advertises it today.
4. **The checkout domain.** These links live on `link.fastpaydirect.com`, the
   agency's white-label domain. A buyer clicking "Reserve your spot — $395" lands on
   a domain with no visible relationship to Chef Deb, which is a trust cost on a $395
   purchase. Worth checking whether payment links can be pointed at a `chefdeb.com`
   domain, given `c.chefdeb.com` is already connected.
5. **Build the automation** — the reason for the whole move:
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

6. **The branded checkout page, before 1 Dec.** Two payment links cannot express
   "whichever tier is currently open" to the static CTAs. One GHL checkout page that
   offers the open tier solves that properly, and is what the client described in
   their Loom. To build it: open the Checkout step → **Use existing** → Funnel →
   `Sedona CEO Retreat Sales` → `Workshop Attendee` → Import, then attach both
   products on the step's **Products** tab (the import deliberately does not carry
   products across), add a Thank You step, attach `c.chefdeb.com` in funnel Settings
   and publish. That needs the drag-and-drop builder, so it is a hands-on job.

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
