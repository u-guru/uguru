# Setting up fastlane
This is setting up fastlane

## Installation
Additionally, to an Xcode installation, you also need the Xcode command line tools set up

```xcode-select --install```
If you have not used the command line tools before (which is likely if you just installed it), you'll need to accept the terms of service.

```sudo xcodebuild -license accept```

Install the gem and all its dependencies (this might take a few minutes).
```sudo gem install fastlane --verbose```

If you experience slow launch times of fastlane, try running
```gem cleanup```


