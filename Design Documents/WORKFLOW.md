# User Workflows - Kilometros de Vida

## Overview
This document outlines the key user workflows in the Kilometros de Vida application.

## 1. New User Registration & First Donation

```mermaid
flowchart TD
    A[User visits site] --> B{Wants to donate?}
    B -->|Yes| C[Click 'Dona Alimentos']
    B -->|No| D[Browse site]
    
    C --> E{Logged in?}
    E -->|No| F[See login prompt]
    E -->|Yes| G[Fill donation form]
    
    F --> H[Click 'Sign in with Google']
    H --> I[Google OAuth popup]
    I --> J[Select Google account]
    J --> K[User created in DB]
    K --> G
    
    G --> L[Enter org name]
    L --> M[Enter contact info]
    M --> N[Enter food type]
    N --> O[Enter pickup time]
    O --> P[Enter address]
    P --> Q[Submit form]
    
    Q --> R{Validation}
    R -->|Failed| S[Show error message]
    S --> G
    R -->|Success| T[Donation saved to DB]
    T --> U[Show success message]
    U --> V[Address geocoded]
    V --> W[Pin appears on map]
```

## 2. Volunteer Registration Workflow

```mermaid
flowchart TD
    A[User visits site] --> B[Click 'Únete como Voluntario']
    B --> C[Fill volunteer form]
    
    C --> D[Enter full name]
    D --> E[Enter email]
    E --> F[Enter phone]
    F --> G[Select availability]
    G --> H[Submit form]
    
    H --> I{Validation}
    I -->|Failed| J[Show error message]
    J --> C
    I -->|Success| K[Volunteer saved to DB]
    K --> L[Show success message]
    L --> M[Form reset]
```

## 3. Managing Donations (Profile Page)

```mermaid
flowchart TD
    A[User clicks Profile] --> B{Authenticated?}
    B -->|No| C[Redirect to Home]
    B -->|Yes| D[Load user data]
    
    D --> E[Fetch donations from DB]
    E --> F[Display donations list]
    
    F --> G{User action}
    G -->|Edit| H[Click Edit button]
    G -->|Delete| I[Click Delete button]
    G -->|None| J[View only]
    
    H --> K[Form fields become editable]
    K --> L[Modify fields]
    L --> M[Click Save]
    M --> N[PUT /api/donations/:id]
    N --> O[Update DB]
    O --> P[Refresh list]
    
    I --> Q[Confirm deletion]
    Q -->|Cancel| F
    Q -->|Confirm| R[DELETE /api/donations/:id]
    R --> S[Remove from DB]
    S --> P
```

## 4. Viewing Impact Map

```mermaid
flowchart TD
    A[User scrolls to map section] --> B[DonationMap component loads]
    B --> C[Fetch all donations]
    C --> D{Donations exist?}
    
    D -->|No| E[Show empty map]
    D -->|Yes| F[For each donation]
    
    F --> G{Address cached?}
    G -->|Yes| H[Load from localStorage]
    G -->|No| I[Call Nominatim API]
    
    I --> J[Wait 1.1s rate limit]
    J --> K[Get lat/lng]
    K --> L[Cache in localStorage]
    
    H --> M[Add marker to map]
    L --> M
    
    M --> N{More donations?}
    N -->|Yes| F
    N -->|No| O[Display complete map]
    
    O --> P[User clicks marker]
    P --> Q[Show popup with details]
```

## 5. Error Handling Workflow

```mermaid
flowchart TD
    A[User action] --> B{Network error?}
    B -->|Yes| C[Show 'Connection failed' message]
    B -->|No| D{Validation error?}
    
    D -->|Yes| E[Show field-specific errors]
    D -->|No| F{Server error?}
    
    F -->|Yes| G[Show 'Server error' message]
    F -->|No| H{Success}
    
    H --> I[Show success message]
    I --> J[Update UI]
    
    C --> K[Retry option]
    E --> L[User corrects input]
    G --> K
```

## User Journey Map

### Donor Journey
1. **Discovery**: User learns about food waste problem
2. **Awareness**: Sees impact statistics on homepage
3. **Interest**: Clicks "Dona Alimentos"
4. **Action**: Fills out donation form
5. **Confirmation**: Sees success message
6. **Engagement**: Sees their location on map
7. **Retention**: Returns to profile to manage donations

### Volunteer Journey
1. **Motivation**: Wants to help community
2. **Exploration**: Reads "Cómo Funciona" section
3. **Decision**: Clicks "Únete como Voluntario"
4. **Registration**: Fills availability form
5. **Confirmation**: Receives success message
6. **Future**: (Could add) Receives notifications for nearby pickups