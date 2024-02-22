const {
  withAppDelegate,
} = require('@expo/config-plugins');


function withRnAppAuth(config) {
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

module.exports = withRnAppAuth;