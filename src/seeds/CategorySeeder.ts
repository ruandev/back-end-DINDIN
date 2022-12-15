import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Category } from '../entities/Category'



export class CategorySeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const categoryRepository = dataSource.getRepository(Category)

        const descriptionData = [{
            description: 'Alimentação'
        },
        {
            description: 'Assinaturas e Serviços'
        }, {
            description: 'Casa'
        }, {
            description: 'Mercado'
        }, {
            description: 'Cuidados Pessoais'
        }, {
            description: 'Educação'
        }, {
            description: 'Família'
        }, {
            description: 'Lazer'
        }, {
            description: 'Pets'
        }, {
            description: 'Presentes'
        }, {
            description: 'Roupas'
        }, {
            description: 'Saúde'
        }, {
            description: 'Transporte'
        }, {
            description: 'Salário'
        }, {
            description: 'Vendas'
        }, {
            description: 'Outras receitas'
        }, {
            description: 'Outras despesas'
        }]

        const newCategory = categoryRepository.create(descriptionData)
        await categoryRepository.save(newCategory)

    }
}