# Marble Moorti Shop

## Overview

A traditional marble sculpture business website showcasing handcrafted marble moortis (religious statues). The site features a public-facing storefront with product catalogs, business information, and customer contact capabilities, plus an admin panel for content management. Built as a static frontend ready for PHP backend integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML/CSS/JS Structure**: Traditional multi-page website using vanilla technologies for easy PHP integration
- **Bootstrap 5 Framework**: Responsive grid system and component library for consistent UI
- **Component-Based Pages**: Separate HTML files for each major section (Home, Products, Services, About, Contact)
- **Admin Interface**: Dedicated admin login and dashboard pages with sidebar navigation

### Authentication Design
- **Simple Form-Based Login**: Admin login page with username/password fields
- **Session-Ready Forms**: All forms include proper method="POST" attributes for backend processing
- **Role Separation**: Clear distinction between public pages and admin-protected areas

### Content Management Strategy
- **Admin Dashboard**: Centralized interface for managing products, categories, and customer enquiries
- **Product Management**: Forms and tables ready for CRUD operations on product catalog
- **Enquiry System**: Customer contact forms feeding into admin review system

### Styling and Assets
- **Custom CSS Variables**: Consistent color scheme using CSS custom properties
- **Font Integration**: Google Fonts (Poppins) for professional typography
- **Icon System**: Font Awesome for consistent iconography
- **Responsive Design**: Mobile-first approach using Bootstrap's grid system

### JavaScript Functionality
- **Progressive Enhancement**: Minimal JS for UI interactions (password toggle, navbar effects)
- **Admin Interface**: Client-side interactions for dashboard navigation and form handling
- **Modal System**: Bootstrap modals for product details and enquiry forms

## External Dependencies

### CDN Resources
- **Bootstrap 5.3.2**: UI framework and responsive components
- **Font Awesome 6.4.0**: Icon library for interface elements
- **Google Fonts**: Poppins font family for typography

### Planned Integrations
- **PHP Backend**: Forms and admin system designed for PHP processing
- **Database Layer**: Admin dashboard prepared for product and enquiry data management
- **File Upload System**: Admin product forms include image upload capabilities
- **Email System**: Contact forms ready for email notification integration

### Third-Party Services (Future)
- **Google Maps**: Placeholder for location embedding on contact page
- **WhatsApp Integration**: Quick action buttons for customer communication
- **Payment Gateway**: Architecture supports future e-commerce functionality