// completingUI.ts
import { ICompletingModel } from '../../types/completing/ICompletingModel';
import { ICompletingUI } from '../../types/completing/ICompletingUI';
import { Component } from '../../utils/components';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

interface ICompletingActions {
	onClick: () => void;
}

type CompletingSetings = {
	img: string;
	title: string;
	descriptions: string;
	close: string;
	actions?: ICompletingActions;
	events?: IEvents;
};

export class CompletingUI
	extends Component<HTMLElement>
	implements ICompletingUI<ICompletingModel>
{
	_model: ICompletingModel;
	_img?: HTMLImageElement;
	_title: HTMLElement;
	_descriptions: HTMLElement;
	_close?: HTMLButtonElement;

	constructor(
		model: ICompletingModel,
		protected events: IEvents,
		container: HTMLElement,
		settings: CompletingSetings
	) {
		super(container);
		this._model = model;
		this._img = ensureElement<HTMLImageElement>(settings.img, this.container);
		this._title = ensureElement<HTMLElement>(settings.title, this.container);
		this._descriptions = ensureElement<HTMLElement>(
			settings.descriptions,
			this.container
		);
		this._close = ensureElement<HTMLButtonElement>(
			settings.close,
			this.container
		);

		if (settings?.actions?.onClick) {
			this._close.addEventListener('click', settings.actions.onClick);
		}
	}
}
