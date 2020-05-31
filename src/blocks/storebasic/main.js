const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { 
  InnerBlocks
} = wp.editor
const { 
  TextControl,
  SelectControl 
} = wp.components
const { 
  useState,
  useEffect
} = wp.element

const edit = ({attributes, setAttributes}) => {

  const [ providers, setProviders ] = useState([])

  useEffect(() => {
    
    fetch('/wp-json/tpyts/providers?per_page=100')
    .then(res => res.json())
    .then(providers => setProviders(providers))

  }, [])

  return <div className="TPYTSBlock BlockStoreBasic">

    <div className="SectionTitle">
      { __('Datos', 'tpyts') }
    </div>

    <div className="Data">

      <div className="Group">   

        <div className="GroupTitle">
          { __('Administración', 'tpyts') }
        </div>
        
        <div className="Field Provider G5">
          <SelectControl
            label={ __('Provider', 'tpyts') }
            value={ attributes.provider }
            options={ 
              [
                {
                  value: 0,
                  label: __('Selecciona provider', 'tpyts')               
                }
              ].concat(
              providers
              .map(provider => ({
                value: provider.ID,
                label: provider.post_title                
              })))
             }
            onChange={ value => setAttributes({
              ...attributes,
              provider: value
            })}
          />
        </div> 

        <div className="Field StoreId G5">
          <TextControl
            label={ __('Identificador', 'tpyts')}
            value={ attributes.storeid }
            onChange={ value => setAttributes({
              ...attributes,
              storeid: value
            })}
          />
        </div>    
      </div>

      <div className="Group">      
        <div className="GroupTitle">
          { __('Localización', 'tpyts') }
        </div>  
        <div className="Field AddressStreet IN G3">
          <TextControl
            label={ __('Calle', 'tpyts')}
            value={ attributes.addressstreet }
            onChange={ value => setAttributes({
              ...attributes,
              addressstreet: value
            })}
          />
        </div>    
        <div className="Field AddressNumber IN G2">
          <TextControl
            label={ __('Número', 'tpyts')}
            value={ attributes.addressnumber }
            onChange={ value => setAttributes({
              ...attributes,
              addressnumber: value
            })}
          />
        </div>     
        <div className="Field Location IN G5">
          <TextControl
            label={ __('Localidad (CP Pob Prov)', 'tpyts')}
            value={ attributes.location }
            onChange={ value => setAttributes({
              ...attributes,
              location: value
            })}
          />
        </div> 
      </div>   
         
      <div className="Group">      
        <div className="GroupTitle">
          { __('Geolocalización', 'tpyts') }
        </div>      
        <div className="Field Latitude IN G5">
          <TextControl
            label={ __('Latitude', 'tpyts')}
            value={ attributes.latitude }
            onChange={ value => setAttributes({
              ...attributes,
              latitude: value
            })}
          />
        </div>      
        <div className="Field Longitude IN G5">
          <TextControl
            label={ __('Longitude', 'tpyts')}
            value={ attributes.longitude }
            onChange={ value => setAttributes({
              ...attributes,
              longitude: value
            })}
          />
        </div>   
      </div> 
    </div>   

    <div className="SectionTitle">
      { __('Información', 'tpyts') }
    </div>
      
    <div className="Info">
      <InnerBlocks 
        templateLock={ false }
        allowedBlocks={[
          'core/heading',
          'core/paragraph'
        ]}
      /> 
    </div>

    <div className="SectionTitle">
      { __('Galería de imágenes', 'tpyts') }
    </div>                                                                 
  </div>
}

const save = ({ attributes }) => {

  return (
		<div className="BlockStoreBasic">
      <InnerBlocks.Content />
		</div>
	)
}

registerBlockType(
  'tpyts/storebasic',
  {
    title: __('Store Básico', 'tpyts'),
    icon: 'store',
    category: 'tpyts',
    attributes: {
      provider: {
        type: 'string'
      },
      storeid: {
        type: 'string'
      },
      addressstreet: {
        type: 'string'
      },
      addressnumber: {
        type: 'string'
      },
      location: {
        type: 'string'
      },
      longitude: {
        type: 'string'
      },
      latitude: {
        type: 'string'
      },
    }, 
    edit: edit,
    save: save
  }
)