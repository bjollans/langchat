const {
  withAppDelegate,
  withAppBuildGradle,
} = require('@expo/config-plugins');



function withRnAppAuthIos(config) {
  return withAppDelegate(
    config,
    async (
      config
    ) => {
      const xcodeProject = config.modResults;
      xcodeProject.contents = xcodeProject.contents.replace('#import "AppDelegate.h"', `#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>
#import <React/RCTLinkingManager.h>
#import "RNAppAuthAuthorizationFlowManager.h"

@interface AppDelegate : EXAppDelegateWrapper <RNAppAuthAuthorizationFlowManager>

@property(nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate> authorizationFlowManagerDelegate;

@end`);

      return config;
    }
  );
};

function withRnAppAuthAndroid(config) {
  return withAppBuildGradle(config, (config) => {
    const build_gradle = config.modResults;
    build_gradle.contents = build_gradle.contents.replace('defaultConfig {', `defaultConfig {
        manifestPlaceholders = [
            appAuthRedirectScheme: 'com.googleusercontent.apps.501061996944-j5a2isahmbe72ca7qfftp8j0dqr227md'
        ]`);
    return config;
  });
}

function withRnAppAuth(config) {
  return withRnAppAuthAndroid(
    withRnAppAuthIos(config)
  );
}

module.exports = withRnAppAuth;