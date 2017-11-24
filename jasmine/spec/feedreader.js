/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i]).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    describe('The menu', function() {
        /* Variables initialization */
        var body, menuIcon;
        beforeEach(function() {
            body = $('body');
            menuIcon = $('.menu-icon-link');
        });

        /* Test that ensure the menu element is hidden by default */
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
        /* it should be no menu-hidden class when menu icon was clicked and vice versa. */
        it('should be hidden when clicked', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            // 异步请求
            loadFeed(0, done); // done执行完后（超时范围内），it会开始执行
        });

        it("loads initial entries", function() {
            var entries = $(".feed").children().filter(".entry-link")
            expect(entries.length).toBeGreaterThan(0)
        })
    });

    describe('New Feed Selection', function() {
        var beforeText, afterText;

        beforeEach(function(done) {
            /*
            First we call the feed and save the titles in beforeText using promise to prevent race condition.
            The saved titles which we will use to compare later with the second loaded feed.
             */
            function loadTextAsync() {
                return new Promise(function(resolve, reject) {
                    loadFeed(0, function() {
                        beforeText = $('.entry').first().find('h2').text();
                        if (beforeText) {
                            resolve(beforeText);
                        } else {
                            reject(Error("It broke!"));
                        }
                    })
                });
            }
            loadTextAsync().then(function(beforeText) {
                /* Here we load the feed again and compare variables to ensure that feed content has changed */
                loadFeed(1, function() {
                    afterText = $('.entry').first().find('h2').text();
                    console.log('before:' + beforeText + " after: " + afterText);
                    loadFeed(0);
                });
            }, function(err) {
                console.log(err);
            }).then(function() {
                done();
            });
        });

        it('changes the h2 content when new feed is loaded', function(done) {
            expect(beforeText).not.toEqual(afterText);
            done();
        });
    });
}());