// Email Tools Bundle - All custom Unlayer tools in one file
// This file is loaded in Unlayer iframe context via customJS

console.log('========================================');
console.log('[EMAIL-TOOLS] BUNDLE LOADING IN IFRAME...');
console.log('[EMAIL-TOOLS] window.location:', window.location.href);
console.log('[EMAIL-TOOLS] window.unlayer exists:', !!window.unlayer);
console.log('[EMAIL-TOOLS] unlayer.registerTool exists:', !!(window.unlayer && window.unlayer.registerTool));
console.log('[EMAIL-TOOLS] unlayer.createViewer exists:', !!(window.unlayer && window.unlayer.createViewer));
console.log('========================================');

// IMPORTANT: This script runs in iframe context, set ASSETS_URL here
// IMPORTANT: Use global ASSETS_URL set by parent window
// If not available, use default value
const ASSETS_URL = window.ASSETS_URL || 'https://api.site426.tangram-studio.com/assets';

// Check if Unlayer is available
if (!window.unlayer) {
  console.error('[EMAIL-TOOLS] CRITICAL: window.unlayer is not available!');
  throw new Error('Unlayer is not loaded');
}

if (!window.unlayer.registerTool) {
  console.error('[EMAIL-TOOLS] CRITICAL: unlayer.registerTool is not available!');
  throw new Error('unlayer.registerTool is not a function');
}

if (!window.unlayer.createViewer) {
  console.error('[EMAIL-TOOLS] CRITICAL: unlayer.createViewer is not available!');
  throw new Error('unlayer.createViewer is not a function');
}

// ====================
// EMAIL HEADER TOOL
// ====================
console.log('[EMAIL-TOOLS] Registering Email Header tool...');
unlayer.registerTool({
  name: 'email_header',
  label: 'Email Header',
  icon: 'fa-header',
  supportedDisplayModes: ['web', 'email'],
  options: {
    navigation: {
      title: 'Navigation',
      position: 1,
      options: {
        leftNavText1: {
          label: 'Left Link 1',
          defaultValue: 'PRODUCTE',
          widget: 'text'
        },
        leftNavUrl1: {
          label: 'Left Link 1 URL',
          defaultValue: '{{$page_link}}',
          widget: 'text'
        },
        leftNavText2: {
          label: 'Left Link 2',
          defaultValue: 'SUPPORT',
          widget: 'text'
        },
        leftNavUrl2: {
          label: 'Left Link 2 URL',
          defaultValue: '{{$contact_link}}',
          widget: 'text'
        },
        logoUrl: {
          label: 'Logo URL',
          defaultValue: `${ASSETS_URL}/logo.png`,
          widget: 'text'
        },
        logoAlt: {
          label: 'Logo Alt Text',
          defaultValue: 'logo',
          widget: 'text'
        },
        rightImageUrl: {
          label: 'Right Image URL',
          defaultValue: `${ASSETS_URL}/18.png`,
          widget: 'text'
        },
        rightImageAlt: {
          label: 'Right Image Alt Text',
          defaultValue: '18+',
          widget: 'text'
        }
      }
    },
    styling: {
      title: 'Styling',
      position: 2,
      options: {
        backgroundImage: {
          label: 'Background Image',
          defaultValue: `${ASSETS_URL}/header.png`,
          widget: 'text'
        },
        backgroundColor: {
          label: 'Background Color',
          defaultValue: '#f2f0e8',
          widget: 'color_picker'
        },
        navTextColor: {
          label: 'Navigation Text Color',
          defaultValue: '#181716',
          widget: 'color_picker'
        },
        headerHeight: {
          label: 'Header Height',
          defaultValue: '88px',
          widget: 'text'
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <table style="
            width: 100%;
            background-image: url('${values.backgroundImage || `${ASSETS_URL}/header.png`}');
            background-size: 100% ${values.headerHeight || '88px'};
            background-repeat: no-repeat;
            background-color: ${values.backgroundColor || '#f2f0e8'};
            padding: 3px 22px;
            height: ${values.headerHeight || '88px'};
          ">
            <tr>
              <td style="width: 230px; vertical-align: middle; text-align: left;">
                <a href="${values.leftNavUrl1 || '#'}" style="
                  display: inline-block;
                  margin-right: 10px;
                  margin-left: 10px;
                  font-size: 13px;
                  line-height: 16px;
                  font-weight: 600;
                  letter-spacing: -0.26px;
                  text-decoration: none;
                  color: ${values.navTextColor || '#181716'};
                ">${values.leftNavText1 || 'PRODUCTE'}</a>
                <a href="${values.leftNavUrl2 || '#'}" style="
                  display: inline-block;
                  margin-right: 10px;
                  margin-left: 10px;
                  font-size: 13px;
                  line-height: 16px;
                  font-weight: 600;
                  letter-spacing: -0.26px;
                  text-decoration: none;
                  color: ${values.navTextColor || '#181716'};
                ">${values.leftNavText2 || 'SUPPORT'}</a>
              </td>
              <td style="width: 200px; text-align: center; vertical-align: middle;">
                <img src="${values.logoUrl || `${ASSETS_URL}/logo.png`}"
                     alt="${values.logoAlt || 'logo'}"
                     style="max-width: 150px; height: auto;" />
              </td>
              <td style="width: 200px; text-align: right; vertical-align: middle;">
                <img src="${values.rightImageUrl || `${ASSETS_URL}/18.png`}"
                     alt="${values.rightImageAlt || '18+'}"
                     style="max-width: 60px; height: auto; margin-right: 10px;" />
              </td>
            </tr>
          </table>
        `;
      }
    }),
    exporters: {
      web: function(values) {
        return this.Viewer.render(values);
      },
      email: function(values) {
        return this.Viewer.render(values);
      }
    }
  }
});
console.log('[EMAIL-TOOLS] Email Header tool registered');

// ====================
// EMAIL BODY TOOL
// ====================
console.log('[EMAIL-TOOLS] Registering Email Body tool...');
unlayer.registerTool({
  name: 'email_body',
  label: 'Email Body',
  icon: 'fa-envelope',
  supportedDisplayModes: ['web', 'email'],
  options: {
    content: {
      title: 'Content',
      position: 1,
      options: {
        greeting: {
          label: 'Greeting',
          defaultValue: 'Hi',
          widget: 'text'
        },
        customerName: {
          label: 'Customer Name',
          defaultValue: '{{ $customer_full_name }}',
          widget: 'text'
        },
        messageText: {
          label: 'Message',
          defaultValue: 'This is your email message.',
          widget: 'rich_text'
        }
      }
    },
    styling: {
      title: 'Styling',
      position: 2,
      options: {
        backgroundColor: {
          label: 'Background Color',
          defaultValue: '#FFFFFF',
          widget: 'color_picker'
        },
        borderRadius: {
          label: 'Border Radius',
          defaultValue: '32px',
          widget: 'text'
        },
        padding: {
          label: 'Padding',
          defaultValue: '45px',
          widget: 'text'
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <div style="
            background-color: ${values.backgroundColor || '#FFFFFF'};
            border-radius: ${values.borderRadius || '32px'};
            padding: ${values.padding || '45px'};
            margin: 20px 0;
          ">
            <p style="margin: 0 0 10px; font-size: 16px; color: #000;">
              ${values.greeting || 'Hi'} ${values.customerName || '{{ $customer_full_name }}'},
            </p>
            <div style="font-size: 16px; line-height: 1.6; color: #000;">
              ${values.messageText || 'This is your email message.'}
            </div>
          </div>
        `;
      }
    }),
    exporters: {
      web: function(values) {
        return this.Viewer.render(values);
      },
      email: function(values) {
        return this.Viewer.render(values);
      }
    }
  }
});
console.log('[EMAIL-TOOLS] Email Body tool registered');

// ====================
// SUPPORT BUTTON TOOL
// ====================
console.log('[EMAIL-TOOLS] Registering Support Button tool...');
unlayer.registerTool({
  name: 'support_button',
  label: 'Support Button',
  icon: 'fa-life-ring',
  supportedDisplayModes: ['web', 'email'],
  options: {
    content: {
      title: 'Content',
      position: 1,
      options: {
        buttonText: {
          label: 'Button Text',
          defaultValue: 'ONLINE SUPPORT',
          widget: 'text'
        },
        buttonUrl: {
          label: 'Button URL',
          defaultValue: '{{$contact_link}}',
          widget: 'text'
        },
        supportIconUrl: {
          label: 'Support Icon URL',
          defaultValue: `${ASSETS_URL}/support.png`,
          widget: 'text'
        }
      }
    },
    styling: {
      title: 'Styling',
      position: 2,
      options: {
        backgroundImage: {
          label: 'Background Image',
          defaultValue: `${ASSETS_URL}/support-bg.png`,
          widget: 'text'
        },
        buttonBackground: {
          label: 'Button Background Image',
          defaultValue: `${ASSETS_URL}/support-btn.png`,
          widget: 'text'
        },
        buttonTextColor: {
          label: 'Button Text Color',
          defaultValue: '#ffffff',
          widget: 'color_picker'
        },
        blockHeight: {
          label: 'Block Height',
          defaultValue: '155px',
          widget: 'text'
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <div style="
            background-image: url('${values.backgroundImage || `${ASSETS_URL}/support-bg.png`}');
            background-size: cover;
            background-position: center;
            height: ${values.blockHeight || '155px'};
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
          ">
            <a href="${values.buttonUrl || '#'}" style="
              background-image: url('${values.buttonBackground || `${ASSETS_URL}/support-btn.png`}');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              padding: 15px 40px;
              color: ${values.buttonTextColor || '#ffffff'};
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
            ">
              ${values.buttonText || 'ONLINE SUPPORT'}
            </a>
          </div>
        `;
      }
    }),
    exporters: {
      web: function(values) {
        return this.Viewer.render(values);
      },
      email: function(values) {
        return `
          <table style="
            background-image: url('${values.backgroundImage || `${ASSETS_URL}/support-bg.png`}');
            background-size: cover;
            background-position: center;
            height: ${values.blockHeight || '155px'};
            width: 100%;
            margin: 20px 0;
          ">
            <tr>
              <td style="text-align: center; vertical-align: middle;">
                <a href="${values.buttonUrl || '#'}" style="
                  background-image: url('${values.buttonBackground || `${ASSETS_URL}/support-btn.png`}');
                  background-size: contain;
                  background-repeat: no-repeat;
                  background-position: center;
                  padding: 15px 40px;
                  color: ${values.buttonTextColor || '#ffffff'};
                  text-decoration: none;
                  font-weight: bold;
                  display: inline-block;
                ">
                  ${values.buttonText || 'ONLINE SUPPORT'}
                </a>
              </td>
            </tr>
          </table>
        `;
      }
    }
  }
});
console.log('[EMAIL-TOOLS] Support Button tool registered');

// ====================
// NOTICE BLOCK TOOL
// ====================
console.log('[EMAIL-TOOLS] Registering Notice Block tool...');
unlayer.registerTool({
  name: 'notice_block',
  label: 'Notice Block',
  icon: 'fa-info-circle',
  supportedDisplayModes: ['web', 'email'],
  options: {
    content: {
      title: 'Content',
      position: 1,
      options: {
        noticeTitle: {
          label: 'Title',
          defaultValue: 'NOTE:',
          widget: 'text'
        },
        noticeText: {
          label: 'Notice Text',
          defaultValue: 'This is a notice.',
          widget: 'rich_text'
        }
      }
    },
    styling: {
      title: 'Styling',
      position: 2,
      options: {
        titleColor: {
          label: 'Title Color',
          defaultValue: '#181716',
          widget: 'color_picker'
        },
        textColor: {
          label: 'Text Color',
          defaultValue: '#3d3d3d',
          widget: 'color_picker'
        },
        linkColor: {
          label: 'Link Color',
          defaultValue: '#e42073',
          widget: 'color_picker'
        },
        borderColor: {
          label: 'Border Color',
          defaultValue: '#181716',
          widget: 'color_picker'
        },
        padding: {
          label: 'Padding',
          defaultValue: '10px 0 22px',
          widget: 'text'
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <div style="
            border-top: 1px solid ${values.borderColor || '#181716'};
            padding: ${values.padding || '10px 0 22px'};
            margin: 20px 0;
          ">
            <p style="
              font-weight: bold;
              color: ${values.titleColor || '#181716'};
              margin: 10px 0 5px;
            ">${values.noticeTitle || 'NOTE:'}</p>
            <div style="
              color: ${values.textColor || '#3d3d3d'};
              font-size: 14px;
              line-height: 1.6;
            ">
              ${values.noticeText || 'This is a notice.'}
            </div>
          </div>
        `;
      }
    }),
    exporters: {
      web: function(values) {
        return this.Viewer.render(values);
      },
      email: function(values) {
        return this.Viewer.render(values);
      }
    }
  }
});
console.log('[EMAIL-TOOLS] Notice Block tool registered');

// ====================
// FOOTER BLOCK TOOL
// ====================
console.log('[EMAIL-TOOLS] Registering Footer Block tool...');
unlayer.registerTool({
  name: 'footer_block',
  label: 'Footer Block',
  icon: 'fa-address-card',
  supportedDisplayModes: ['web', 'email'],
  options: {
    contacts: {
      title: 'Contact Information',
      position: 1,
      options: {
        logoUrl: {
          label: 'Logo URL',
          defaultValue: `${ASSETS_URL}/logo.png`,
          widget: 'text'
        },
        logoAlt: {
          label: 'Logo Alt Text',
          defaultValue: 'logo',
          widget: 'text'
        },
        websiteName: {
          label: 'Website Name',
          defaultValue: 'Linda Seeds.com',
          widget: 'text'
        },
        websiteUrl: {
          label: 'Website URL',
          defaultValue: '#',
          widget: 'text'
        },
        addressLine1: {
          label: 'Address Line 1',
          defaultValue: 'Calle San Valero 1',
          widget: 'text'
        },
        addressLine2: {
          label: 'Address Line 2',
          defaultValue: '46005 Valencia',
          widget: 'text'
        },
        addressLine3: {
          label: 'Address Line 3',
          defaultValue: 'Spanien',
          widget: 'text'
        },
        closingText: {
          label: 'Closing Text',
          defaultValue: '<p>Sincerely,<br>Your Linda Team</p>',
          widget: 'rich_text'
        }
      }
    },
    copyright: {
      title: 'Copyright',
      position: 2,
      options: {
        greetingText: {
          label: 'Greeting Text',
          defaultValue: 'Dear customer,',
          widget: 'text'
        },
        copyrightText: {
          label: 'Copyright Text',
          defaultValue: 'reserves all rights.',
          widget: 'text'
        },
        companyName: {
          label: 'Company Name',
          defaultValue: 'Linda Seeds',
          widget: 'text'
        },
        currentYear: {
          label: 'Year',
          defaultValue: '2025',
          widget: 'text'
        }
      }
    },
    styling: {
      title: 'Styling',
      position: 3,
      options: {
        contactsBackgroundColor: {
          label: 'Contacts Background Color',
          defaultValue: '#ffffff',
          widget: 'color_picker'
        },
        contactsBorderRadius: {
          label: 'Contacts Border Radius',
          defaultValue: '32px',
          widget: 'text'
        },
        contactsTextColor: {
          label: 'Contacts Text Color',
          defaultValue: '#181716',
          widget: 'color_picker'
        },
        contactsLinkColor: {
          label: 'Contacts Link Color',
          defaultValue: '#e42073',
          widget: 'color_picker'
        },
        contactsPadding: {
          label: 'Contacts Padding',
          defaultValue: '15px 20px',
          widget: 'text'
        },
        copyrightBackgroundColor: {
          label: 'Copyright Background Color',
          defaultValue: '#181716',
          widget: 'color_picker'
        },
        copyrightTextColor: {
          label: 'Copyright Text Color',
          defaultValue: '#f2f0e8',
          widget: 'color_picker'
        },
        copyrightPadding: {
          label: 'Copyright Padding',
          defaultValue: '20px',
          widget: 'text'
        },
        copyrightFontSize: {
          label: 'Copyright Font Size',
          defaultValue: '14px',
          widget: 'text'
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return `
          <div style="margin-bottom: 32px;">
            ${values.closingText || '<p>Sincerely,<br>Your Linda Team</p>'}
          </div>

          <table style="
            background-color: ${values.contactsBackgroundColor || '#ffffff'};
            padding: ${values.contactsPadding || '15px 20px'};
            border-radius: ${values.contactsBorderRadius || '32px'};
            width: 100%;
            margin: 0 auto 20px;
          ">
            <tr>
              <td style="width: 200px; vertical-align: top; padding: 10px 20px;">
                <img width="136px"
                     src="${values.logoUrl || `${ASSETS_URL}/logo.png`}"
                     alt="${values.logoAlt || 'logo'}" />
              </td>
              <td style="width: 200px; vertical-align: top; padding: 10px 20px;">
                <a href="${values.websiteUrl || '#'}" style="
                  display: block;
                  padding: 3px 19px;
                  color: ${values.contactsLinkColor || '#e42073'};
                  text-decoration: none;
                  font-size: 16px;
                  line-height: 24px;
                ">${values.websiteName || 'Linda Seeds.com'}</a>
              </td>
              <td style="width: 200px; vertical-align: top; padding: 10px 20px;">
                <span style="
                  color: ${values.contactsTextColor || '#181716'};
                  font-size: 16px;
                  line-height: 24px;
                ">
                  ${values.addressLine1 || 'Calle San Valero 1'}<br />
                  ${values.addressLine2 || '46005 Valencia'}<br />
                  ${values.addressLine3 || 'Spanien'}
                </span>
              </td>
            </tr>
          </table>

          <table style="
            width: 100%;
            background-color: ${values.copyrightBackgroundColor || '#181716'};
            border-radius: 32px 32px 0px 0px;
            padding: ${values.copyrightPadding || '20px'};
          ">
            <tr>
              <td style="text-align: center; padding: 20px;">
                <span style="
                  color: ${values.copyrightTextColor || '#f2f0e8'};
                  display: block;
                  margin-bottom: 10px;
                  font-size: ${values.copyrightFontSize || '14px'};
                ">${values.greetingText || 'Dear customer,'}</span>
                <p style="
                  color: ${values.copyrightTextColor || '#f2f0e8'};
                  margin: 0;
                  font-size: ${values.copyrightFontSize || '14px'};
                  line-height: 1.5;
                ">
                  В© ${values.currentYear || '2025'} ${values.companyName || 'Linda Seeds'} ${values.copyrightText || 'reserves all rights.'}
                </p>
              </td>
            </tr>
          </table>
        `;
      }
    }),
    exporters: {
      web: function(values) {
        return this.Viewer.render(values);
      },
      email: function(values) {
        return this.Viewer.render(values);
      }
    }
  }
});
console.log('[EMAIL-TOOLS] Footer Block tool registered');

console.log('[EMAIL-TOOLS] All Email Tools Bundle loaded successfully!');
