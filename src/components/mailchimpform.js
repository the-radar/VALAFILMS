export default function MailchimpForm () {
    return (
      <div id="mc_embed_signup" style={{
        color: 'white',
        fontFamily: 'inherit',
        width: '100%',
        margin: '0 auto'
      }}>
        <form
          action="https://valafilms.us14.list-manage.com/subscribe/post?u=38941a28b22e72801d96ce404&amp;id=138e58bb86&amp;f_id=0085c2e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2 style={{color: 'white'}}>Subscribe to our newsletter</h2>
            <div className="mc-field-group" style={{marginBottom: '15px'}}>
              <input 
                type="email" 
                name="EMAIL" 
                className="required email" 
                id="mce-EMAIL" 
                required
                placeholder="Your email address"
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#222',
                  border: '1px solid #444',
                  color: 'white'
                }}
              />
            </div>
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
              <input 
                type="text" 
                name="b_38941a28b22e72801d96ce404_138e58bb86" 
                tabIndex={-1} 
                value="" 
              />
            </div>
            <div className="clear foot">
              <input 
                type="submit" 
                value="Subscribe" 
                name="subscribe" 
                id="mc-embedded-subscribe" 
                className="button"
                style={{
                  background: '#444',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              />
            </div>
          </div>
        </form>
      </div>
    );
  };