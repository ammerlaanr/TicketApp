# Documentatie

## Opdrachtbeschrijving

Dear Testnet Participant,

I’m looking for a software solution to help manage ticket sales for events at my venue. The
platform should allow an admin user to create and publish ticket batches for upcoming
events, including the total number of tickets available and details about the event itself.

Visitors to the platform must first register as users, providing their address information. This
address data should be validated through an external service that checks the combination of
postal code and house number and returns the correct city. Once registered, users can
purchase tickets for an event. After a successful purchase, each user should receive a
uniquely numbered ticket linked to their name and order.

The users should be able to see an overview of events with amount and available tickets.
When not all tickets are sold they should be able to order tickets.

Upon completion of the reservation, the platform should automatically send the user a
confirmation email containing all relevant information, including the verified address to which
the tickets will be sent. Additionally, all transactions and related user data must be securely
logged for administrative and reporting purposes.

I’m looking for a reliable, secure, and user-friendly solution that can scale with our event
offerings. Please let me know if you can deliver this functionality or if you require more
information.

Kind regards,
AHOY Rotterdam

## Business Requirements

BR-001 - The platform shall allow an admin user to create and publish ticket
batches for upcoming events, specifying the total number of tickets
and event details.

BR-002 - Visitors shall be required to register before purchasing tickets,
providing full address information during registration.

BR-003 - The platform shall validate address information by calling an external
service that checks the combination of postal code and house number
and returns the correct city.

BR-004 - Registered users shall be able to purchase tickets for events tha have available tickets.

BR-005 - Each successful ticket purchase shall result in the user receiving a
uniquely numbered ticket associated with their name and order.

BR-006 - The platform shall present users with an overview of all events,
including the number of tickets available and the number already sold.

BR-007 - Users shall only be able to purchase tickets for events where tickets
are still available.

BR-008 - Upon completing a ticket reservation, the platform shall send a
confirmation email to the user with all event and ticket details,
including the verified shipping address.

BR-009 - The platform shall securely log all transactions and associated user
data for administrative and reporting purposes.

BR-010 - The solution shall be reliable, secure, user-friendly, and scalable to
support multiple events and a growing user base.

## Functional requirements 

FR-001 - The system shall provide an admin interface to create and
configure events, including event name, description, date, and
ticket quantity. (Traced BR: BR-001)

FR-002 - The system shall allow the admin to publish ticket batches to
make them visible and available for sale to users. (Traced BR: BR-001)

FR-003 - The system shall provide a user registration form that collects
name, email, postal code, house number, and optionally other
contact details. (Traced BR: BR-002)

FR-004 - The system shall call an external address verification API
using the postal code and house number, and automatically
populate the city field. (Traced BR: BR-003)

FR-005 - The system shall store verified address data in the user profile
upon successful registration. (Traced BR: BR-003, BR-002)

FR-006 - The system shall allow registered users to view a list of all
events with the number of tickets available and sold. (Traced BR: BR-006)

FR-007 - The system shall allow users to select an event and purchase
a specified number of tickets, limited to availability. (Traced BR: BR-004, BR-007)

FR-008 - The system shall generate a unique ticket number for each
ticket purchased, linked to the user and order details. (Traced BR: BR-005)

FR-009 - The system shall send a confirmation email to the user after
purchase, containing event details, ticket number(s), and
shipping address. (Traced BR: BR-008)

FR-010 - The system shall log each transaction with a timestamp, user
ID, event ID, ticket number(s), and delivery address. (Traced BR: BR-009)

FR-011 - The system shall provide administrative users with access to
reports of ticket sales, user data, and transaction logs. (Traced BR: BR-009)

FR-012 - The platform shall support user-friendly interfaces with
responsive design for usability on various devices. (Traced BR: BR-010)

FR-013 - The platform shall implement security best practices, including
HTTPS, encrypted storage of personal data, and access
control for admin functions. (Traced BR: BR-010)

FR-014 - The platform shall support scaling to accommodate an
increasing number of events and users without performance
degradation. (Traced BR: BR-010)

## Technical Design

### Technology Stack
Frontend: React (served via Node.js)
Backend: Node.js (Express.js)
Data Layer: In-memory array (acts as a temporary database)

### System Architecture
Client (React)
⬇️ REST API calls
Backend (Node.js with Express)
⬇️ In-memory Arrays
Data Layer (Events, Users, Tickets, Logs)

### Technical Components
1. Frontend (React)
Event overview page
Registration form
Ticket purchase page
Confirmation screen
Admin panel for event creation

2. Backend (Node.js + Express)
REST API with routes for:
User registration and address verification
Event creation (admin)
Event listing (public)
Ticket purchase and confirmation
Logging and reporting (admin)

3. Data Layer (Arrays)
users[]: holds user records
events[]: holds event details and ticket availability
tickets[]: holds purchased ticket data
logs[]: stores audit and transaction logs

## Technical Requirements

TR-001 - The React frontend shall call the backend via REST API
endpoints for all operations. (Traced BR/FR: BR-004, FR-006)

TR-002 - The backend shall expose an endpoint POST
/admin/events to create events and ticket batches. (Traced BR/FR: BR-001, FR-001)

TR-003 - The backend shall expose GET /events to return a list of
available events with remaining tickets. (Traced BR/FR: BR-006, FR-006)

TR-004 - The backend shall expose POST /users/register to handle
user sign-up and call an external API to validate postal
code and house number. (Traced BR/FR: BR-002, BR-003, FR-003, FR-004)

TR-005 - The backend shall expose POST /tickets/reserve to
reserve tickets for users if tickets are available. (Traced BR/FR: BR-004, FR-007)

TR-006 - Each reservation shall generate a unique ticket number
using a UUID scheme or ticket counter. (Traced BR/FR: BR-005, FR-008)

TR-007 - The backend shall send confirmation emails using an
email service like Nodemailer with full ticket and address
details. (Traced BR/FR: BR-008, FR-009)

TR-008 - All transactions shall be stored in a logs[] array including
timestamp, user, event, and action. (Traced BR/FR: BR-009, FR-010)

TR-009 - The backend shall expose GET /admin/logs to allow
admin users to retrieve logs for reporting. (Traced BR/FR: BR-009, FR-011)

TR-010 - React components must use form validation and clear
user feedback for usability. (Traced BR/FR: BR-010, FR-012)

TR-011 - The backend shall enforce HTTPS (assumed for
production deployment) and restrict access to admin
routes. (Traced BR/FR: BR-010, FR-013)

TR-012 - The backend and frontend shall handle concurrency
issues by locking the ticket count during purchase flow. (Traced BR/FR: BR-004, FR-007)
 
TR-013 - All arrays must be treated as persistent objects during
runtime, with proper indexing (e.g., by ID) for fast lookup. (Traced BR/FR: All)

TR-014 - The backend shall call an external address verification API
during user registration to retrieve the correct city based
on postal code and house number. (Traced BR/FR: BR-003, FR-004)