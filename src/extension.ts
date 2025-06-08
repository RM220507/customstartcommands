// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const status_bar_item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	status_bar_item.text = "$(run-all) Run Project";
	status_bar_item.command = "customstartcommands.start";
	status_bar_item.show();

	context.subscriptions.push(status_bar_item);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const set_disposable = vscode.commands.registerCommand("customstartcommands.set_start_command", async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const command = await vscode.window.showInputBox({
			placeHolder: "Type your custom start command"
		});

		if (command === undefined) {
			return;
		}

		const config = vscode.workspace.getConfiguration("customstartcommands");
		await config.update("start_command", command, vscode.ConfigurationTarget.Workspace);
	});
	context.subscriptions.push(set_disposable);

	const run_disposable = vscode.commands.registerCommand("customstartcommands.start", () => {
		const config = vscode.workspace.getConfiguration("customstartcommands");
		const command = config.get<string>("start_command");

		if (command === "" || command === undefined) {
			vscode.window.showErrorMessage("No start command has been configured.");
			return;
		}

		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(command);
	});
	context.subscriptions.push(run_disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
