# Personal portfolio

This is a [Next.js](https://nextjs.org/) project with [Typescript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Run the development server

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel
To deploy Next.js app used [Vercel Platform](https://vercel.com)

## Quickly check code in browser

[Code Github1s Link](https://github1s.com/Vivekparmar999/Portfolio)

## Acknowledgements
Special thanks to [Vivek Patel](https://github.com/vivek9patel) for providing portfolio inspiration.

---

## How to view large data in Google analytics instead use looker Studio

### Google analytics Steps

#### Part 1: Register Your Custom Parameters in GA4
GA4 only saves event parameters if you register them as "Custom Dimensions." You must do this for every parameter you want to see in your reports.

#### Navigate to Custom Definitions
Go to your GA4 property.
Click Admin (the gear icon ⚙️ in the bottom-left).
In the "Property" column, click Custom definitions.

#### Create a Custom Dimension
Click the Create custom dimensions button.
Fill out the form for your first parameter. The Event parameter field must be an exact match to your code.
Example for pagePath:
Dimension name: Page Path (This is the friendly name you'll see in reports).
Scope: Event.
Event parameter: pagePath.
Click Save.

#### Repeat for All Other Parameters
Repeat the process above for every other parameter from your code that you want to analyze. Use the table below as your guide.
Dimension name (for reports) | Event parameter (from code)
---------------------------|-------------------------
Country                    | country
City                       | city
Device Type                | deviceType
Page Title                 | pageTitle
...and so on               | ...

#### Important
After creating these, it can take 24-48 hours for historical data to appear in reports. New events will be tracked immediately and can be verified in DebugView.

#### Part 2: Build the Exploration Report
Once your dimensions are registered and have collected some data, you can build the report.

#### Navigate to Explore
In the left-hand navigation, click Explore.
Click to create a new "Free form" exploration.

#### Import Dimensions and Metrics
In the "Variables" column on the left, you need to import everything you want to use.
Dimensions: Click the + and import:
Event name
The custom dimensions you just created: Page Path, Country, City, Device Type.
Metrics: Click the + and import:
Event count.

#### Build the Report Table
Rows: Drag the following from "Dimensions" into the "Rows" section:
Event name
Page Path
Country
City
Device Type
Values: Drag Event count from "Metrics" into the "Values" section.

#### Filter for Your Specific Event
To see data only for viewResume_btn_click, drag Event name from the "Dimensions" list into the "Filters" section at the bottom.
Set the filter condition to "exactly matches" and enter viewResume_btn_click.
Click Apply.