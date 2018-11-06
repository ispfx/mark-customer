## mark-customer

This is a list view command set extension built in SharePoint Framework.

### Building Your Own Extension

This solution is intended to accompany [Introduction to SharePoint Framework](https://sharepointfx.io/), an online educational course that helps you to learn modern SharePoint Framework development techniques. Learn how to build your own extension by following the lessons found at [sharepointfx.io](https://sharepointfx.io/).

### Getting Started

```bash
# Install dependencies
npm i

# Launch the extension in debug mode
#  - Note that you may need to customize config/serve.json
gulp serve
```

### Deploying to SharePoint

```bash
# Bundle the solution
gulp bundle --ship

# Package the solution
#  - This creates a sharepoint/solution/mark-customer.sppkg file
gulp package-solution --ship
```

Once you have a `mark-customer.sppkg` file, you can deploy this to your SharePoint environment's [App Catalog](https://docs.microsoft.com/en-us/sharepoint/use-app-catalog). See the **Deploying and Updating Solutions** lesson for more information on solution deployment.

### Learn More

For more information about the structure and functionality of this solution, see the [official SharePoint Framework documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview).
