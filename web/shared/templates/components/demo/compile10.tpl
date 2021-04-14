 <view type='mobile:ios'>
    <imports>
        <import-dict as="components" post="interpolate:root">
            {
                "global": {
                    "slideActive":1
                },
                "slide1":
                {
                    "dog": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/dog.png",
                        "animation": {
                            "onRender": "width:66%,x:6%,y:10%",
                            "onExit": "translateY:500%:0%:1000:easeOutCirc:0:1:r",
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f,opacity:0:1:1000:linear:0:1:f"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "welcome": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/welcome.png",
                        "animation": {
                            "onRender": "width:31%,x:47%,y:26%",
                            "onExit": "translateY:500%:0%:1000:easeOutCirc:0:1:r",
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f"
                        },
                        "location": {
                            "image": {
                                "width":"31%",
                                "x": "47%",
                                "y": "26%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 3,
                            "position": "absolute"
                        }
                    },
                    "background": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/window_background.png",
                        "width": 100,
                        "height": 100,
                        "animation": {
                            "onRender": "width:100%,x:0,y:0",
                            "onExit": "translateY:200%:0%:1000:easeInBounce:500:1:r",
                            "onEnter": "translateY:200%:0%:1000:easeInBounce:500:1:f"
                        },
                        "location": {
                            "image": {
                                "width":"100%",
                                "x": "0",
                                "y": "0"
                            },
                            "viewbox": "0 -5 100 105",
                            "layer": 0,
                            "position": "absolute"
                        }
                    },
                    "window": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/window.png",
                        "animation": {
                            "onRender": "transform:translateY(200%),width:100%,x:0%,y:0%",
                            "onExit": "translateY:500%:0%:1000:easeOutCirc:0:1:r",
                            "onEnter": "translateY:200%:0%:1000:easeInBounce:500:1:f",
                            "onInit": "::onEnter"
                        },
                        "location": {
                            "image": {
                                "width":"100%",
                                "x": "0%",
                                "y": "0%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 1,
                            "position": "absolute"
                        }
                    },
                    "windIcon": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/wind-icon.tpl",
                        "count": "25",
                        "animation": {
                            "initWith": "transform:translateX(200%)",
                            "onExit":  "translateY:500%:0%:1000:easeOutCirc:0:1:r",
                            "onEnter": "translateY:500%:0%:1000:easeOutCirc:0:1:f",
                            "onInit": "::onEnter"
                        },
                        "location": {
                            "image": {
                                "width":"10%",
                                "x": "0",
                                "y": "0"
                            },
                            "layer": 0,
                            "position": "absolute",
                            "viewbox": "0 0 100 100",
                        },
                        "style": {
                            "transparency": 0.8
                        }
                    }
                },
                "slide2": {
                    "city": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide2/assets/images/city.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scaleY:0:1:1000:easeInOutBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"100%",
                                "x": "0",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "dog": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide2/assets/images/dog.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "translateX:0:1:1000:linear:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"25%",
                                "x": "6%",
                                "y": "20%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "road": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide2/assets/images/road.png",
                        "animation": {
                            "initWith": "opacity:0,transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "sign": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide2/assets/images/sign.png",
                        "animation": {
                            "initWith": "opacity:0,transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "sign_shadow": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide2/assets/images/sign_shadow.png",
                        "animation": {
                            "initWith": "opacity:0,transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "skate_shadow": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide2/assets/images/skate_shadow.png",
                        "animation": {
                            "initWith": "opacity:0,transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    }
                },
                "slide3": {
                    "dog": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide3/assets/images/dog.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "shelf": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide3/assets/images/shelf.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "pool": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide3/assets/images/pool.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "back": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide3/assets/images/back.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "frame": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide3/assets/images/frame.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    }
                },
                "slide4": {
                    "back": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide4/assets/images/back.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "dog": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide4/assets/images/do.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "flowers1": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide4/assets/images/flowers1.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "flowers2": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide4/assets/images/flowers2.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    },
                    "scroll": {
                        "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide4/assets/images/scroll.png",
                        "animation": {
                            "initWith": "transform:translateX(-200%)scale(0)",
                            "onExit": {
                                "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                            },
                            "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                            "onInit": "::onEnter",
                            "onExit": "::onEnter:reverse"
                        },
                        "location": {
                            "image": {
                                "width":"66%",
                                "x": "6%",
                                "y": "10%"
                            },
                            "viewbox": "0 0 100 100",
                            "layer": 2,
                            "position": "absolute"
                        }
                    }
                },
                "nav": {
                    "top": {
                        "tabs": [
                            {title: 'home'},
                            {title: 'portfolio'},
                            {title: 'drops'},
                            {title: 'blog'},
                            {title: 'contact'}
                        ]
                    },
                    "side": {
                        "menu": {
                            "buttons": [
                                {
                                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/files/shared/welcome.png",
                                    "animation": {
                                        "initWith": "",
                                        "onExit": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                                        },
                                        "onEnter": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:f",
                                        },
                                        "onInit": "::onEnter",
                                        "onExit": "::onEnter:reverse"
                                    },
                                    "location": {
                                        "image": {
                                            "width": "75%",
                                            "x": "0",
                                            "y": "0"
                                        },
                                        "layer": 0,
                                        "viewbox": "-35 0 200 50"
                                    },
                                    "style": {
                                        "transparency": 1
                                    }
                                },
                                {
                                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/files/shared/what-get.png",
                                    "animation": {
                                        "initWith": "",
                                        "onExit": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                                        },
                                        "onEnter": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:f",
                                        },
                                        "onInit": "::onEnter",
                                        "onExit": "::onEnter:reverse"
                                    },
                                    "location": {
                                        "image": {
                                            "width": "90%",
                                            "x": "0",
                                            "y": "0"
                                        },
                                        "layer": 0,
                                        "viewbox": "0 0 200 50"
                                    },
                                    "style": {
                                        "transparency": 1
                                    }
                                },
                                {
                                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/files/shared/latest-proj.png",
                                    "animation": {
                                        "initWith": "",
                                        "onExit": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                                        },
                                        "onEnter": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:f",
                                        },
                                        "onInit": "::onEnter",
                                        "onExit": "::onEnter:reverse"
                                    },
                                    "location": {
                                        "image": {
                                            "width": "75%",
                                            "x": "0",
                                            "y": "0"
                                        },
                                        "layer": 0,
                                        "viewbox": "-30 0 200 50"
                                    },
                                    "style": {
                                        "transparency": 1
                                    }
                                },
                                {
                                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/files/shared/in-touch.png",
                                    "animation": {
                                        "initWith": "",
                                        "onExit": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                                        },
                                        "onEnter": {
                                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:f",
                                        },
                                        "onInit": "::onEnter",
                                        "onExit": "::onEnter:reverse"
                                    },
                                    "location": {
                                        "image": {
                                            "width": "75%",
                                            "x": "0",
                                            "y": "0"
                                        },
                                        "layer": 0,
                                        "viewbox": "-35 0 200 50"
                                    },
                                    "style": {
                                        "transparency": 1
                                    }
                                }
                            ]
                        },
                        "pawIcon": {
                            "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/files/shared/active+paw.png",
                            "animation": {
                                "initWith": "",
                                "onExit": {
                                    "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:r"
                                },
                                "onEnter": {
                                    "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:f",
                                },
                                "onInit": "::onEnter",
                                "onExit": "::onEnter:reverse"
                            },
                            "location": {
                                "image": {
                                    "width": "28px",
                                    "height": "28px",
                                    "x": "15px",
                                    "y": "0px"
                                },
                                "position": "absolute",
                                "layer": 0,
                                "viewbox": "0 0 70 55"
                            },
                            "style": {
                                "transparency": 1
                            }
                        }
                    }
                }
            }
        </import-dict>
    </imports>
    <components>
        <wind-icon source='var' offset-x="string" offset-y="string">
            <div init-with="p:[transform:translateY(500%),margin-left:-8%,margin-top:-40px,margin-bottom:-40px]" grow='1' when-init-wind-icon="a:[{{::comp.source.animation.onEnter}}]">
                <graphic grow='1' u when-start-moving-slowly="a:[translateX:0%:-5%:3000:easeOutSine:0:100:a,translateY:0%:-10%:3000:easeOutSine:0:100:a,scale:0.8:0.82:3000:linear:0:100:f]:+4000" flex style='transform:scale(0.8)' url="https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/wind-icon.tpl">
                </graphic>
            </div>
        </wind-icon>
        <img-svg source="var">
            <div u init-with="p:[width:{{comp.source.location.container.width||'inherit'}},height:{{comp.source.location.container.height||'inherit'}},z-index:{{comp.source.location.layer}},position:{{::comp.source.location.position}}]" when-component-exit="p:[opacity:0]">
                <svg version="1.1"
                    inherit-w
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink= "http://www.w3.org/1999/xlink"
                    viewBox="{{::comp.source.location.viewbox ||'0 0 100 100'}}"
                    preserveAspectRatio="xMinYMid"
                    >
                        <image init-with="p:[width:{{::comp.source.location.image.width}},y:{{::comp.source.location.image.y}},x:{{::comp.source.location.image.x}},{{::comp.source.animation.initWith}}]" on-init="a:[{{::comp.source.animation.onEnter}}]"  u xlink:href="{{::comp.source.url}}" when-view-1-component-exit="a:[translateY:0%:500%:500:easeOutBounce:0:1:f`]"  when-component-enter="a:[{{::comp.source.animation.onEnter}}]" />
                </svg>
            </div>
        </img-svg>
        <top-nav model="var">
            <div bg='transparent' abs top='0' left='0' size='100'>
                <div width='100%'  fixed z-index="100" height='10%' u init-with="p:[opacity:0,transform:translateY(-100%)]"  when-top-nav-enter="a:[fadeInDown:250:linear:0:1:f]|p:[z-index:20]">
                    <div align-self='stretch' height='100%' width='100%' row x='center' y='center' bg='white'>
                        <div grow='4' row nowrap height='inherit' x='right'>
                            <div align-self='stretch' flex grow='1'>
                                &nbsp;
                            </div>
                            <div flex align-self="stretch" grow='3' class='txt-charcoal' f-s='32px' row nowrap class='uppercase' l-s='0.35em'>
                                <div inherit-h-w class='round' m-x='15px' bg='charcoal-20p' p='15 17.5'>&nbsp;</div>
                                <h1 x='center' y='center' column>
                                    LOGO
                                </h1>
                            </div>
                        </div>
                        <div row nowrap grow='6' txt='charcoal' x='center' y='center' height='inherit' l-s="-0.1" u>
                            <div grow='1' column nowrap x='center' y='center' class='uppercase'>
                                {{view.data}} {{comp.model.tabs[0].title}}
                            </div>
                            <div grow='1' column nowrap x='center' y='center' class='uppercase' u on-click='s:[nav-inactive:sibling]' pointer>
                                {{comp.model.tabs[1].title}}
                            </div>
                            <div grow='1' column nowrap x='center' y='center' class='uppercase' u when-nav-inactive="p:[opacity:0.5]">
                                {{comp.model.tabs[2].title}}
                            </div>
                            <div grow='1' column wrap x='center' y='center' class='uppercase'>
                                {{comp.model.tabs[3].title}}
                            </div>
                            <div grow='1' column wrap x='center' y='center' class='uppercase'>
                                {{comp.model.tabs[4].title}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </top-nav>
        <side-nav model="var" active-index='var'>
            <div bg='transparent' height='55%' width='25%' z-index='100' fixed right='0' bottom='0' row nowrap init-with="p:[opacity:0]" u on-init="a:[fadeInUp:2000:bouncePast:4000:1:f]">
                <div grow='3' flex column-reverse>
                    <div c-r nowrap x='center' y='center' grow='1' width='100'>
                        <div grow='1' flex align-items="flex-start" width='100' row>

                            <div u on-mouseenter="a:[scaleX:1:1.1:250:linear:0:1:f,scaleY:1:1.1:250:linear:0:1:f]" on-mouseleave="a:[scaleX:1:1.1:250:linear:0:1:r,scaleY:1:1.1:250:linear:0:1:r]" on-click='s:[view-2-exit:public,view-3-exit:public,view-4-exit:public,{{comp.slideActive!==0&&"view-1-enter:public"}}]'>
                                <img-svg width='100' source="::comp.model.menu.buttons[0]" pointer>
                                </img-svg>
                            </div>
                        </div>
                        <!-- I stopped here-->
                        <div grow='1' align-items="center" width='100' pointer >
                            <div  u on-mouseenter="a:[scaleX:1:1.1:250:linear:0:1:f,scaleY:1:1.1:250:linear:0:1:f]" on-mouseleave="a:[scaleX:1:1.1:250:linear:0:1:r,scaleY:1:1.1:250:linear:0:1:r]" on-click='s:[view-1-exit:public]'>
                                <img-svg  width='100' source="::comp.model.menu.buttons[1]" pointer>
                                </img-svg>
                            </div>
                        </div>
                        <div grow='1' align-items="flex-end" m-top='-20px' width='100' row>
                            <div u on-mouseenter="a:[scaleX:1:1.1:250:linear:0:1:f,scaleY:1:1.1:250:linear:0:1:f]" on-mouseleave="a:[scaleX:1:1.1:250:linear:0:1:r,scaleY:1:1.1:250:linear:0:1:r]">
                                <img-svg width='100' source="::comp.model.menu.buttons[2]" pointer>
                                </img-svg>
                            </div>
                        </div>
                        <div grow='1' align-items="flex-end" width='100' row pointer>
                             <div u on-mouseenter="a:[scaleX:1:1.1:250:linear:0:1:f,scaleY:1:1.1:250:linear:0:1:f]" on-mouseleave="a:[scaleX:1:1.1:250:linear:0:1:r,scaleY:1:1.1:250:linear:0:1:r]">
                                <img-svg width='100' source="::comp.model.menu.buttons[3]" pointer>
                                </img-svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div grow='1' width='33%' padding='10% 0' >
                    <div c-r grow='1' align-self='stretch' m-right='-20px' nowrap width='50%' p-bottom='25px'>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-side-nav-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-side-nav-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-2-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-2-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-3-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-3-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-4-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-4-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                    </div>
                    <div c-r grow='1' align-self='stretch' m-left='-20px' nowrap width='50%'>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-side-nav-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-side-nav-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-2-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-2-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-3-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-3-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-4-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                        <div inherit-w-h u init-with="p:[opacity:0.5]" when-view-4-enter="p:[opacity:1]">
                            <img-svg source="::comp.model.pawIcon" >
                            </img-svg>
                        </div>
                    </div>
                </div>
            </div>
        </side-nav>
    </components>
    <main size='100' flex bg='white'>

        <top-nav model="view.data.components.nav.top">
        </top-nav>
        <side-nav model="view.data.components.nav.side" active-index="view.data.components.global.slideActive">
        </side-nav>

        <content size='100' inherit-h-w abs left='0' top='0' u on-init="s:[view-1-enter:public]">
            <!-- <div align-self='stretch' bg='transparent' size='100' abs grow='1' column u init-with="p:[z-index:0]">
                <div flex align-self='stretch' column wrap grow='1' size='100' u init-with="p:[opacity:0.5]" on-init="s:[init-wind-icon:depth(>1):linear-2000,start-moving-slowly:public:linear-10000,top-nav-enter:public,side-nav-enter:public:linear-1000]:+2500" when-self-msg="s:[start-moving-slowly:public:2500]">
                    <wind-icon u-list="item in ::root.list.ofSizeRandInt(25,-10,10).slice()" source="view.data.components.slide1.windIcon" offset-x="item=root.randInt(-10,10)" offset-y="item=root.randInt(-10,10)">
                    </wind-icon>
                </div>
            </div> -->
            <!-- slide1 -->
            <div size='100' flex grow='1' column u init-with="p:[z-index:1]" when-view-1-enter="s:[enter-v1-children:depth(1>)]" when-view-1-exit="s:[exit-v1-children:depth(>1)]">

                        <svg version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink= "http://www.w3.org/1999/xlink"
                            viewBox="0 0 {{root.window.width}} {{root.window.height}}"
                            inherit-h-w
                            >

                                <image init-with="p:[{{::view.data.components.slide1.dog.animation.onRender}}]"
                                    when-enter-v1-children="a:[{{::view.data.components.slide1.dog.animation.onEnter}}]" when-exit-v1-children="a:[{{::view.data.components.slide1.dog.animation.onExit}}]"  u xlink:href="{{::view.data.components.slide1.dog.url}}"
                                    />
                                <image init-with="p:[{{::view.data.components.slide1.welcome.animation.onRender}}]"
                                    when-enter-v1-children="a:[{{::view.data.components.slide1.welcome.animation.onEnter}}]" when-exit-v1-children="a:[{{::view.data.components.slide1.welcome.animation.onExit}}]"  u xlink:href="{{::view.data.components.slide1.welcome.url}}"
                                    />

                                <image init-with="p:[{{::view.data.components.slide1.background.animation.onRender}}]"
                                    when-enter-v1-children="a:[{{::view.data.components.slide1.background.animation.onEnter}}]" when-exit-v1-children="a:[{{::view.data.components.slide1.background.animation.onExit}}]"  u xlink:href="{{::view.data.components.slide1.background.url}}"
                                    />
                                <image init-with="p:[{{::view.data.components.slide1.window.animation.onRender}}]"
                                    when-enter-v1-children="a:[{{::view.data.components.slide1.window.animation.onEnter}}]" when-exit-v1-children="a:[{{::view.data.components.slide1.window.animation.onExit}}]"  u xlink:href="{{::view.data.components.slide1.window.url}}"
                                />
                        </svg>
            </div>

            <div size='100' flex grow='1' u init-with="p:[z-index:1]" ng-if='false'>

                    <img-svg source="view.data.components.slide2.city" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide2.dog" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide2.road" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide2.sign" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide2.sign_shadow" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide2.skate_shadow" inherit-h-w window='root.window'>
                    </img-svg>
            </div>
            <!-- Slide 3-->
            <div size='100' abs flex grow='1' u init-with="p:[z-index:-1,opacity:0]" ng-if='false'>
                <img-svg source="view.data.components.slide3.back" inherit-h-w window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.slide3.dog" inherit-h-w window='root.window'>
                </img-svg>
                <div grow='1' flex inherit-h-w>
                    <img-svg source="view.data.components.slide3.frame" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide3.frame" inherit-h-w window='root.window'>
                    </img-svg>
                    <img-svg source="view.data.components.slide3.frame" inherit-h-w window='root.window'>
                    </img-svg>
                </div>
                <img-svg source="view.data.components.slide3.pool" inherit-h-w window='root.window'>
                </img-svg>

                <img-svg source="view.data.components.slide3.shelf" inherit-h-w window='root.window'>
                </img-svg>
            </div>
             <div size='100' abs flex grow='1' u init-with="p:[z-index:1]" ng-if='false'>
                <img-svg source="view.data.components.slide4.back" inherit-h-w window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.slide4.dog" inherit-h-w window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.slide4.flowers1" inherit-h-w window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.slide4.flowers2" inherit-h-w window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.slide4.scroll" inherit-h-w window='root.window'>
                </img-svg>
            </div>
        </content>
    </main>
    <utility type="footer" ng-if='view.data.components.wind' fixed>

        <controls>

        </controls>

    </utility>
</view>
