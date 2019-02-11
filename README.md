# Portfolio Builder

## Table of Contents

- [Download Instructions](#Download)
- [Usage Instructions](#Usage)
- [Example PortfolioData.json File](#Example%20PortfolioFile.json)
- [Tips and Gotchas](#Tips%20and%20Gotchas)

-----

## Download

Install the file globally. This is a command line utility.

`npm install -g git+https://github.com/ajshiff/portfolio-builder.git`
##### [Back To Table of Contents](#Table%20of%20Contents)

-----

## Usage

Portfolio Builder takes two arguments.
1. A portfolioBuilder.json data file
1. An output file name.

Run the following command in the command line:

`portfolioBuilder P/A/T/H/TO/PortfolioBuilder.json OutputName.html`

**NOTES:**

If No Path is specified to the portfolioBuilder.json file, the current directory will be checked for a case-insensitive `PortfolioBuilder.json` file. 

If no output name is provided for the name of the html file that will be produced, the file that is produced will be called `:timestamp:-index.html`. For example: `20190210_1515_2104-index.html`. It follows the format of `YYYYMMDD_kkmm_ssSS-index.html`.

Use the HTML File however you'd like!
##### [Back To Table of Contents](#Table%20of%20Contents)

-----

## Example PortfolioFile.json
```
[
    {
        "name": "Example Project Name",
        "hours": 100,
        "link": "https://github.com/ajshiff/portfolio-builder",
        "timeframe": "February 2019 - March 2019",
        "description": "The main content description of your project goes here.",
        "imgSrc": "./PATH/To/Image/Asset/You/Want/To/Reference.png",
        "imgAlt": "Alt Text for your Image",
        "skills": [
            "NodeJS",
            "ES6"
        ]
    }
]
```

##### [Back To Table of Contents](#Table%20of%20Contents)

-----

## Tips and Gotchas

#### The Output HTML File

- The `<head>` tag of your HTML file will have templated meta tag attributes. It is recommended that you edit these meta fields as appropriate to your project before publishing.

- The required css stylings are included in your head tag, 

#### The PortfolioFile.json

- Make sure your `PortfolioFile.json` is an array of objects.

- None of the keys on the object are required, but including all of the keys from the example are recommended.

- If you wish to explicitly define a key, but leave it empty, assign it a litteral `null` value. If you use an empty string (`""`), that empty string will be treated as a normal string, as if you intended it to show up in your portfolio page.

- The `skills` property must be an array, or else your value will appear as one skill.

- The hours field can be a number or a string.

- The `imgSrc` property will be copied verbatim into the `<image>` "src" attribute on the HTML page.
    - This means that you have the flexability to link to an image somewhere else on the internet.
    - If you choose to use a locally stored asset, it is recommended to use relative pathing that follows the data structure of your website. 
        - For example, if I had a file structure like the one below. If I wanted to save my new file, `myPortfolio.html`, into the `prod` folder, and had an image I wanted to use in my `myPortfolio.html` called `project.png`, I should copy `project.png` into my assets folder, and use the value `./assets/project.png` for the `imgSrc` key.
```
C:\\
|---My Website
    |---prod
        |---index.html
        |---assets
            |---Image1.png
            |---Image2.png
            |---Image3.png
```
##### [Back To Table of Contents](#Table%20of%20Contents)

-----




