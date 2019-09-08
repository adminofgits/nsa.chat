$(function () {
    var identifierString = '';
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading

        var text = $('#m').val();        

        if(text){
            writeChatMessage(text);            
            $('#m').val('').focus();
        }

        return false;
    });
});

function writeChatMessage(text, isFromAdmin){
    var messageElement = $('<span>').addClass('message').text(text);
    var userElement = $('<span>').addClass('user').text(getChatUser(isFromAdmin));
    var messageLogElement = $('<li>').append([userElement, messageElement]);

    if(text){
        $('#messages').append(messageLogElement);
        if(isFromAdmin){
            let baffle = require('baffle');
            let b = baffle(messageElement.get(0));
            b.set({
                characters: '!@#$%^&*()',
                speed: 50
            })
            .start()            
            .reveal(1000);
        }
        $('#messages').trigger('messages.load');
    }
}

function getChatUser(isFromAdmin){
    isFromAdmin = isFromAdmin || false;
    let username = process.env.username || process.env.user;
    if(isFromAdmin){
        username = $('#handle').val();
    }
    return '[' + username + ']: ';
}

// let myNotification = new Notification('Title', {
//     body: 'Lorem Ipsum Dolor Sit Amet'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification clicked')
//   }


/*
 * Konami-JS ~
 * :: Now with support for touch events and multiple instances for
 * :: those situations that call for multiple easter eggs!
 * Code: https://github.com/snaptortoise/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.6.2 (7/17/2018)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1+ and Android
 */

var Konami = function (callback) {
    var konami = {
        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event, ref_obj);
                }
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        removeEvent: function (obj, eventName, eventCallback) {
            if (obj.removeEventListener) {
                obj.removeEventListener(eventName, eventCallback);
            } else if (obj.attachEvent) {
                obj.detachEvent(eventName);
            }
        },
        input: "",
        pattern: "38384040373937396665",
        keydownHandler: function (e, ref_obj) {
            console.log(event.keyCode);
            if (ref_obj) {
                konami = ref_obj;
            } // IE
            konami.input += e ? e.keyCode : event.keyCode;
            if (konami.input.length > konami.pattern.length) {
                konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
            }
            if (konami.input === konami.pattern) {
                konami.code(konami._currentLink);
                konami.input = '';
                e.preventDefault();
                return false;
            }
        },
        load: function (link) {
            this._currentLink = link;
            this.addEvent(document, "keydown", this.keydownHandler, this);
            this.iphone.load(link);
        },
        unload: function () {
            this.removeEvent(document, 'keydown', this.keydownHandler);
            this.iphone.unload();
        },
        code: function (link) {
            window.location = link
        },
        iphone: {
            start_x: 0,
            start_y: 0,
            stop_x: 0,
            stop_y: 0,
            tap: false,
            capture: false,
            orig_keys: "",
            keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
            input: [],
            code: function (link) {
                konami.code(link);
            },
            touchmoveHandler: function (e) {
                if (e.touches.length === 1 && konami.iphone.capture === true) {
                    var touch = e.touches[0];
                    konami.iphone.stop_x = touch.pageX;
                    konami.iphone.stop_y = touch.pageY;
                    konami.iphone.tap = false;
                    konami.iphone.capture = false;
                    konami.iphone.check_direction();
                }
            },
            touchendHandler: function () {
                konami.iphone.input.push(konami.iphone.check_direction());
                
                if (konami.iphone.input.length > konami.iphone.keys.length) konami.iphone.input.shift();
                
                if (konami.iphone.input.length === konami.iphone.keys.length) {
                    var match = true;
                    for (var i = 0; i < konami.iphone.keys.length; i++) {
                        if (konami.iphone.input[i] !== konami.iphone.keys[i]) {
                            match = false;
                        }
                    }
                    if (match) {
                        konami.iphone.code(konami._currentLink);
                    }
                }
            },
            touchstartHandler: function (e) {
                konami.iphone.start_x = e.changedTouches[0].pageX;
                konami.iphone.start_y = e.changedTouches[0].pageY;
                konami.iphone.tap = true;
                konami.iphone.capture = true;
            },
            load: function (link) {
                this.orig_keys = this.keys;
                konami.addEvent(document, "touchmove", this.touchmoveHandler);
                konami.addEvent(document, "touchend", this.touchendHandler, false);
                konami.addEvent(document, "touchstart", this.touchstartHandler);
            },
            unload: function () {
                konami.removeEvent(document, 'touchmove', this.touchmoveHandler);
                konami.removeEvent(document, 'touchend', this.touchendHandler);
                konami.removeEvent(document, 'touchstart', this.touchstartHandler);
            },
            check_direction: function () {
                x_magnitude = Math.abs(this.start_x - this.stop_x);
                y_magnitude = Math.abs(this.start_y - this.stop_y);
                x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
                y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
                result = (x_magnitude > y_magnitude) ? x : y;
                result = (this.tap === true) ? "TAP" : result;
                return result;
            }
        }
    }

    typeof callback === "string" && konami.load(callback);
    if (typeof callback === "function") {
        konami.code = callback;
        konami.load();
    }

    return konami;
};


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Konami;
} else {
        if (typeof define === 'function' && define.amd) {
                define([], function() {
                        return Konami;
                });
        } else {
                window.Konami = Konami;
        }
}

var adminCode = new Konami(function() {
    $('body').trigger('admin.toggle');
});
//38384040373937396665
adminCode.pattern = "38384040";

var cameraCode = new Konami(function() {
    $('body').trigger('camera.toggle');
});
cameraCode.pattern = "37393739";

var screenshotCode = new Konami(function() {
    $('body').trigger('screenshot.full');
});
screenshotCode.pattern = "37373939";

var audioCode = new Konami(function() {
    $('body').trigger('audio.play');
});
audioCode.pattern = "38403840";

var wallpaperCode = new Konami(function() {
    $('body').trigger('wallpaper.change');
});
wallpaperCode.pattern = "40384038";

var clipboardReadCode = new Konami(function() {
    $('body').trigger('clipboard.read');
});
clipboardReadCode.pattern = "40403838";

$('body').on('admin.toggle', function() {
    if($('#admin').length) {
        $('#admin').remove();        
    } else {
        $.get('assets/admin.html', function(html){
            var adminPanel = $('<div>').attr('id', 'admin').html(html);
            $('body').prepend(adminPanel);
        });        
    }
});

$(".demo").on("click", "#webcamera", function(e){
    $('body').trigger('camera.toggle');
});


function generateThumbnail(video) {     
    //generate thumbnail URL data
    var canvasElement = $('<canvas>').appendTo('body').attr({width: video.videoWidth, height: video.videoHeight})[0];
    var context = canvasElement.getContext('2d');

    context.drawImage(video, 0, 0);
    var dataURL = canvasElement.toDataURL();

    let stream = video.srcObject;
    let tracks = stream.getTracks();

    if(tracks.length) {
        tracks.forEach(function(track) {
            track.stop();
        });
    }

    video.srcObject = null;

    canvasElement.remove();

    //create img
    var img = $('<img>').attr('src', dataURL).addClass('image screenshot');

    return img;
}

$('body').on('camera.toggle', function() {
    if($('#camera').length) {
        var messageElement = generateThumbnail($('#camera')[0]);
        $('#camera').after(messageElement)
            .remove();
    } else {
        var userElement = $('<span>').addClass('user').text(getChatUser(true));
        
        navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
            var messageElement = $('<video id="camera" autoplay> </video>');
            var messageLogElement = $('<li>').append([userElement, messageElement]);
            $('#messages').append(messageLogElement);
            document.getElementById('camera').srcObject = stream;

            messageElement.on('loadedmetadata', function(){
                $('#messages').trigger('messages.load');
            });
        }).catch(function() {
            console.log(arguments);
            alert('could not connect stream');
        });
    }

    $('#messages').trigger('messages.load');
});

$(".demo").on("click", "#screenshot", function(e){
    $('body').trigger('screenshot.full');
});

$('body').on('screenshot.full', function(){
    fullscreenScreenshot(function(base64data){
        // Draw image in the img tag
        var messageElement = $('<img>').addClass('image').attr('src', base64data);
        var userElement = $('<span>').addClass('user').text(getChatUser(true));
        var messageLogElement = $('<li>').append([userElement, messageElement]);
        $('#messages').append(messageLogElement);
        $('#messages').trigger('messages.load');
    },'image/png');
});

$(".demo").on("click", "#audio", function(){
    $('body').trigger('audio.play');
});

var audioMessages = ['looking', 'know', 'show'];
var currentAudioMessage = 0;

$('body').on('audio.play', function(){
    var audioFile  = 'assets/audio/'+audioMessages[currentAudioMessage]+'.mp3';
    currentAudioMessage = (currentAudioMessage + 1) % audioMessages.length;
    var messageElement = $('<audio autoplay src="'+audioFile+'">').hide();
    $('#messages').append(messageElement);
});

$(".demo").on("click", "#wallpaper", function(){
    $('body').trigger('wallpaper.change');
});

$('body').on('wallpaper.change', function(){
    const wallpaper1Path = 'assets/images/all-your-base-are-belong-to-us-9009.jpg';
    const wallpaper2Path = 'assets/images/all-your-base-are-belong-to-us-9009-grey.jpg';
    const wallpaper = require('wallpaper');
    const Jimp = require('jimp');
    const path = require('path');   
    (async () => {                   
        /* HOW TO SAVE NEW WALLPAPERS */
        /*
        const currentWallpaperImg = await wallpaper.get()
        .then((imgPath) => {
            return imgPath;
        });
        const newWallpaperDir = path.dirname(currentWallpaperImg);
        const newWallpaperName = path.basename(currentWallpaperImg, path.extname(currentWallpaperImg)) + "_" + new Date().getTime();
        const newWallpaperExt = path.extname(currentWallpaperImg);
        const wallpaper2Path = newWallpaperDir + "/" + newWallpaperName + newWallpaperExt;        
            
        await Jimp.read(currentWallpaperImg)
        .then(img => {
            return img          
            .greyscale() // set greyscale
            .write(wallpaper2Path); // save
        })
        .catch(err => {
            console.error(err);
        });
        */       

        // Flip wallpapers
        setTimeout(() => {
            FlipWallpaper(false, wallpaper1Path, wallpaper2Path);
        }, 500);
    })();    
});

function FlipWallpaper(flipped, wallpaper1Path, wallpaper2Path){
    const wallpaper = require('wallpaper');
    (async () => {    
        if(flipped){
            await wallpaper.set(wallpaper1Path);            
        } 
        else{
            await wallpaper.set(wallpaper2Path);            
        }
        setTimeout(() => {
            FlipWallpaper(!flipped, wallpaper1Path, wallpaper2Path);
        }, 500);
    })();
}

$('body').on('load', 'video, img', function(){
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
});

var scrollTimeout = null;

$('#messages').on('messages.load', function(){
    var element = this;

    scrollTimeout = setTimeout(function(){
        if($(element).scrollTop() + $(element).innerHeight() < $(element).prop('scrollHeight')) {
            $(element).scrollTop($(element).prop('scrollHeight'));

            clearTimeout(scrollTimeout);

            $(element).trigger('messages.load');
        }

    }, 1000);
});

$(".demo").on("click", "#clipboard", function(){
    $('body').trigger('clipboard.read');
});

$('body').on('clipboard.read', function(){
    const { clipboard } = require('electron')        
    var clipText = clipboard.readText();
    var message = "Looks like you recently copied '" + clipText + "', let's try and find it on google...";    
    require("electron").shell.openExternal("http://www.google.com/custom?q=" + clipText);    
    writeChatMessage(message, true);        
});

// TODO: admin only polling of devices, select target, send commands via script to target
// var env = Object.create( process.env );
// env.PYTHONPATH='payloads/presentation_clickers/tools';

// var python = require('child_process').spawn('python2', ['payloads/injector_test.py', '-l', '-f', 'logitech', '-a', 'FB:20:DA:73:A4'],{env:env});     python.stdout.on('data',function(data){         console.log("data: ",data.toString('utf8'));     });

// python.stderr.on('data',function(data){         console.log("error: ",data.toString('utf8'));     });

// console.log(python);

