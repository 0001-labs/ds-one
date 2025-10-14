// Unified registry - imports all DS one components
// This file loads the design system locally from the DS1 folder

import "../../DS1/1-root/one.css";

// Import all components from DS one
import "../../DS1/4-page/ds-grid";
import "../../DS1/4-page/ds-layout";

// Core components
import "../../DS1/2-core/text-v1";
import "../../DS1/2-core/button-v1";
import "../../DS1/2-core/cycle-v1";
import "../../DS1/2-core/link-v1";
import "../../DS1/2-core/title-v1";
import "../../DS1/2-core/icon-v1";

// Unit components
import "../../DS1/3-unit/ds-table";
import "../../DS1/3-unit/list-v1";
import "../../DS1/3-unit/panel-v1";
import "../../DS1/3-unit/row-v1";

console.log("DS one components loaded from local files");
