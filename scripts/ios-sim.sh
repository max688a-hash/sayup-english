#!/usr/bin/env bash
# Boot an iOS simulator, build a simulator variant of the app, install & launch it.
# iOS 26.3 simulators render CJK text as "?" (runtime font gap) — prefer iOS 18.3.
# Usage: bash scripts/ios-sim.sh [device-name]     default: "iPhone 16 Pro"
set -e
NAME="${1:-iPhone 16 Pro}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DERIVED="${SIM_BUILD_DIR:-/tmp/sayup-sim-build}"

# Prefer an iOS 18.x device (26.x has the CJK font bug)
UDID=$(xcrun simctl list devices available -j | python3 - "$NAME" <<'PY'
import json, sys
name = sys.argv[1]
for rt, devs in json.load(sys.stdin)['devices'].items():
    if 'iOS-18' in rt or 'iOS 18' in rt:
        for d in devs:
            if d['name'] == name:
                print(d['udid']); sys.exit()
for rt, devs in json.load(sys.stdin)['devices'].items():
    for d in devs:
        if d['name'] == name:
            print(d['udid']); sys.exit()
PY
)
[ -z "$UDID" ] && { echo "no simulator named '$NAME'"; xcrun simctl list devices available | grep iPhone; exit 1; }

xcrun simctl boot "$UDID" 2>/dev/null || true
open -a Simulator
cd "$ROOT/ios/App"
xcodebuild -project App.xcodeproj -scheme App -configuration Debug \
  -destination "platform=iOS Simulator,id=$UDID" \
  -derivedDataPath "$DERIVED" build CODE_SIGNING_ALLOWED=NO
xcrun simctl install "$UDID" "$DERIVED/Build/Products/Debug-iphonesimulator/App.app"
xcrun simctl launch "$UDID" com.sayup.app
