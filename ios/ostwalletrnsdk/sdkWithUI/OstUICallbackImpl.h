//
/*
 Copyright © 2019 OST.com Inc
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
*/
  

#import <Foundation/Foundation.h>
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#if __has_include("OstWalletSdk-Swift.h")
#import "OstWalletSdkUI-Swift.h"
#else
#import <OstWalletSdkUI/OstWalletSdkUI-Swift.h>
#endif

NS_ASSUME_NONNULL_BEGIN

@interface OstUICallbackImpl : NSObject <RCTBridgeModule, OstPassphrasePrefixDelegate, OstWorkflowUIDelegate>

@property NSString * _Nonnull uuid;

+ (OstUICallbackImpl *_Nullable) getInstance:(NSString *_Nonnull) uuid;
- (instancetype _Nullable ) initWithId:(NSString * _Nonnull) uuId;

@end

NS_ASSUME_NONNULL_END