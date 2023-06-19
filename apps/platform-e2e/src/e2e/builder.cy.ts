import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import slugify from 'voca/slugify'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'

const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT_1 = 'Text 1'
const ELEMENT_TEXT_2 = 'Text 2'
const ELEMENT_BUTTON = 'Button'

const elements = [
  {
    name: ELEMENT_CONTAINER,
    parentElement: ROOT_ELEMENT_NAME,
  },
  {
    name: ELEMENT_ROW,
    parentElement: ELEMENT_CONTAINER,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_A,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_B,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_1,
    parentElement: ELEMENT_COL_A,
  },
  {
    atom: IAtomType.AntDesignButton,
    name: ELEMENT_BUTTON,
    parentElement: ELEMENT_COL_B,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_2,
    parentElement: ELEMENT_BUTTON,
  },
]

const updatedElementName = 'Container Updated'

describe('Elements CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/atom')
      .then(() => cy.request<IAppDTO>('/api/cypress/app'))
      .then((apps) => {
        const app = apps.body
        cy.visit(`/apps/cypress/${slugify(app.name)}/pages/app/builder`)
        cy.getSpinner().should('not.exist')

        // select root now so we can update its child later
        // there is an issue with tree interaction
        // Increased timeout since builder may take longer to load
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
          .should('be.visible')
          .click({ force: true })
      })
  })

  describe('create', () => {
    it('should be able to create elements', () => {
      cy.createElementTree(elements)
    })

    it.skip('should be able to view props', () => {
      cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').click()

      cy.findByTestId('create-element-form')
        .findByLabelText('Name')
        .type(ELEMENT_TEXT_1)

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Parent element',
        type: FIELD_TYPE.SELECT,
        value: ROOT_ELEMENT_NAME,
      })

      cy.findByTestId('create-element-form').setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: IAtomType.AntDesignTypographyText,
      })

      cy.findByTestId('create-element-form')
        .getButton({ label: 'Create Element' })
        .click()
      cy.findByTestId('create-element-form').should('not.exist', {
        timeout: 10000,
      })

      cy.contains(/Text.*/).click()

      cy.get(`[aria-label="setting"]`).click()

      cy.findByText('Custom Text').should('exist')
      cy.findByText(/Edit.*API/).should('exist')
    })
  })

  describe('update', () => {
    it(`should be able to update element`, () => {
      cy.findByText(ELEMENT_CONTAINER).click()
      cy.findByLabelText('Name').clear()
      cy.findByLabelText('Name').type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe('delete', () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(updatedElementName).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(updatedElementName).should('not.exist')
    })
  })
})
