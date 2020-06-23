const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { 
  InnerBlocks
} = wp.editor
const { 
  TextControl,
  TextareaControl,
  SelectControl 
} = wp.components
const { 
  useState,
  useEffect
} = wp.element

const edit = ({attributes, setAttributes}) => {

  const [ stores, setStores ] = useState([])
  const [ allergens, setAllergens ] = useState([])
  
  useEffect(() => {
    
    fetch('/wp-json/tpyts/stores?per_page=100')
    .then(res => res.json())
    .then(stores => setStores(stores))
    
    fetch('/wp-json/tpyts/allergens?per_page=100')
    .then(res => res.json())
    .then(allergens => setAllergens(allergens))

  }, [])

  return <div className="TPYTSBlock BlockServiceBasic">

    <div className="SectionTitle">
      { __('Servicio', 'tpyts') }
    </div>

    <div className="Data">

      <div className="Group">

        <div className="Field Store G3">
          <SelectControl
            label={ __('Store', 'tpyts') }
            value={ attributes.store }
            options={ 
              [
                {
                  value: 0,
                  label: __('Selecciona store', 'tpyts')               
                }
              ].concat(
              stores
              .map(store => ({
                value: store.ID,
                label: store.post_title                
              })))
             }
            onChange={ value => setAttributes({
              ...attributes,
              store: value
            })}
          />
        </div>  

        <div className="Field Components components-base-control G10">
          <label className="components-base-control__label">
            { __('Ingredientes', 'tpyts') }
          </label>
          <TextareaControl
            rows={ 2 }
            onChange={ value => setAttributes({
              ...attributes, 
              components: value
            }) }
            value={ attributes.components }
          />
        </div>          

        <div className="Field Allergens G6">
          <SelectControl
            label={ __('Alérgenos', 'tpyts') }
            multiple
            value={ attributes.allergens && attributes.allergens.split('|') }
            options={
              allergens
              .map(allergen => ({
                value: allergen.ID,
                label: allergen.title                
              }))
             }
            onChange={ value => setAttributes({
              ...attributes,
              allergens: value.join('|')
            })}
          />
        </div>     

        <div className="Field Comments components-base-control G10">
          <label className="components-base-control__label">
            { __('Comentarios', 'tpyts') }
          </label>
          <TextareaControl
            rows={ 2 }
            onChange={ value => setAttributes({
              ...attributes, 
              comments: value
            }) }
            value={ attributes.comments }
          />
        </div>          

        <div className="Field Price G2">
          <TextControl
            label={ __('Precio (€)', 'tpyts')}
            value={ attributes.price }
            onChange={ value => setAttributes({
              ...attributes,
              price: value
            })}
          />
        </div> 
      </div> 
    </div>

    <div className="SectionTitle">
      { __('Galería de imágenes', 'tpyts') }
    </div>                                                                 
  </div>
}

const save = ({ attributes }) => {

  return (
		<div className="BlockServiceBasic">
      <InnerBlocks.Content />
		</div>
	)
}

registerBlockType(
  'tpyts/servicebasic',
  {
    title: __('Servicio Básico', 'tpyts'),
    icon: 'clipboard',
    category: 'tpyts',
    attributes: {
      store: {
        type: 'string'
      },
      components: {
        type: 'string'
      },
      allergens: {
        type: 'string'
      },
      comments: {
        type: 'string'
      },
      price: {
        type: 'string'
      }
    }, 
    edit: edit,
    save: save
  }
)