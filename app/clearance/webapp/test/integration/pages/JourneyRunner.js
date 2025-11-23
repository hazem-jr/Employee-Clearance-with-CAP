sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"clearance/test/integration/pages/clearanceList",
	"clearance/test/integration/pages/clearanceObjectPage"
], function (JourneyRunner, clearanceList, clearanceObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('clearance') + '/test/flp.html#app-preview',
        pages: {
			onTheclearanceList: clearanceList,
			onTheclearanceObjectPage: clearanceObjectPage
        },
        async: true
    });

    return runner;
});

