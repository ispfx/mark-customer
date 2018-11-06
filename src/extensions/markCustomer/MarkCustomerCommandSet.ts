import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'MarkCustomerCommandSetStrings';
import { SPHttpClient } from '@microsoft/sp-http';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMarkCustomerCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'MarkCustomerCommandSet';

export default class MarkCustomerCommandSet extends BaseListViewCommandSet<IMarkCustomerCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const markCustomerCommand: Command = this.tryGetCommand('MARK_CUSTOMER');
    if (markCustomerCommand) {
      // This command should be hidden unless exactly one row is selected.
      markCustomerCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'MARK_CUSTOMER':
        event.selectedRows.map(row => {
          // Get lead data
          const id: number = row.getValueByName('ID');
          const isCustomer: boolean = row.getValueByName('Customer') === 'Yes';

          this.context.spHttpClient.post(`${this.context.pageContext.web.absoluteUrl}/_api/lists/getbyid('${this.context.pageContext.list.id}')/items/getbyid(${id})`, SPHttpClient.configurations.v1, {
            body: `{ "Customer": ${!isCustomer} }`,
            headers: {
              'X-HTTP-Method': 'MERGE',
              'IF-MATCH': '*',
            },
          });
        });
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
