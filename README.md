# install-op-cli

[![](https://github.com/simonbs/install-op-cli/actions/workflows/test.yml/badge.svg)](https://github.com/simonbs/install-op-cli/actions/workflows/test.yml)

GitHub Action to install a specified version of the 1Password CLI.

### 🫥 Deprecated

After publishing this action, 1Password has published their own action for installing their CLI. Therefore this action is deprecated and it is recommended to use [1Password's official action](https://github.com/1Password/install-cli-action) instead.

### 🚀 Getting Started

Add the action to your workflow file.

```yml
name: Install 1Password CLI
uses: simonbs/install-op-cli@1.0.0
with:
  version-number: 2.13.1
```

Note that you must specify the version number of the CLI to install. You can find the complete list of versions [in the release notes for the 1Password CLI](https://app-updates.agilebits.com/product_history/CLI2).

After installing the 1Password CLI, you can invoke it in other steps as shown below.

```yml
name: Verify 1Password was Installed
run: op --version
```

Set the `skip-if-installed` input to true to skip installing the 1Password CLI if a version is already installed. Be aware that if `skip-if-installed` is true, the action will skip installing the CLI even if the installed version does not match the version specified in the action.

```yml
name: Install 1Password CLI
uses: simonbs/install-op-cli@1.0.0
with:
  version-number: 2.13.1
  skip-if-installed: true
```

### ⚡️ How does this work?

The action scrapes the list of available versions from [the release notes for the 1Password CLI](https://app-updates.agilebits.com/product_history/CLI2), finds the version specified in the action, downloads it, and installs it onto the runner.

### 🤨 But why?

1Password is a great place to store any secrets you need in your workflow as the secrets are stored securely and you can update them through any 1Password app. I have previously used 1Passwords [load-secrets-action](https://github.com/1Password/load-secrets-action) to load secrets from 1Password but I found that it was often easier to invoke the CLI directly, especially when copying files out of 1Password which can be done as shown below.

```yml
name: Install SSH Key
run: op read --out-file ~/.ssh/id_rsa "op://GitHub Actions/CI SSH Private Key/ci-ssh-key"
```

### 🙊 Limitations

The action only works on macOS runners as it only knows how to install .pkg files. It could be extended to support installing other files but as I have only needed to use the action on macOS runners, I have not added that.
